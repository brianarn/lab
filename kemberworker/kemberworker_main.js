(function () {
  function KemberManager () {
    // Set some initial values
    this.id = this.registry.length + 1;
    this.data = {
      numProcessed: 0,
      hash: 'none',
      md5: 'n/a'
    };

    // Build some stuff
    this.buildWorker();
    this.buildDOM()

    // Register ourselves
    this.registry.push(this);
  }
  KemberManager.prototype.registry = [];
  KemberManager.prototype.buildWorker = function () {
    var worker = this.worker = new Worker('kemberworker.js');

    worker.onmessage = e => {
      if (e.data.found === true) {
        alert("FOUND!!! " + e.data.hash);
      }
      this.data = e.data;
    }; // worker.onmessage = function(e)

    // Initialize
    worker.postMessage({
      action: 'init',
      id: this.id
    });
  }
  KemberManager.prototype.buildDOM = function () {
    var parent = document.createElement('li');
    parent.innerHTML = `Worker ${this.id}:
      <ul>
        <li>Processed: <span class="processedCount"></span></li>
        <li>Last hash: <span class="lastHash"></span></li>
        <li>MD5 result: <span class="md5"></span></li>
      </ul>`;
    var count = parent.querySelector('.processedCount');
    var hash = parent.querySelector('.lastHash');
    var md5 = parent.querySelector('.md5');

    this.nodes = { parent, count, hash, md5 };
    this.updateDOM();
  };
  KemberManager.prototype.updateDOM = function () {
    var data = this.data;
    var nodes = this.nodes;

    nodes.count.innerHTML = data.numProcessed;
    nodes.hash.innerHTML = data.hash;
    nodes.md5.innerHTML = data.md5;
  };

  var workerCount = parseInt(location.hash.substr(1), 10) || 4;

  document.addEventListener('DOMContentLoaded', function () {
    var workers = window.workers = [];
    var results = document.getElementById('results');
    var totalWorkers = document.getElementById('totalWorkers');
    var totalHashes = document.getElementById('totalHashes');

    // Make 'em
    for (var i = 0; i < workerCount; i++) {
      var mgr = new KemberManager();
      results.appendChild(mgr.nodes.parent);
      workers.push(mgr);
    }
    totalWorkers.innerHTML = workerCount;
    totalHashes.innerHTML = '0';

    // Set up some refreshing
    var rafHandle;
    function refreshWorkerDOM () {
      rafHandle = requestAnimationFrame(refreshWorkerDOM);

      var hashCount = 0;
      workers.forEach(km => {
        km.updateDOM();
        hashCount += km.data.numProcessed;
      });
      totalHashes.innerHTML = hashCount.toString();
    }

    // Handlers for actions
    function startProcessing () {
      workers.forEach(km => {
        km.worker.postMessage({
          action: 'start'
        });
      });
      rafHandle = requestAnimationFrame(refreshWorkerDOM);
    }

    function stopProcessing () {
      workers.forEach(km => {
        km.worker.postMessage({
          action: 'stop'
        });
      });
      cancelAnimationFrame(rafHandle);
    }

    var startBtn = document.getElementById('startProcessing');
    var stopBtn = document.getElementById('stopProcessing');

    startBtn.addEventListener('click', startProcessing);
    stopBtn.addEventListener('click', stopProcessing);
  });
})();
