// Add an array-like sort function
// See http://www.mail-archive.com/discuss@jquery.com/msg05467.html and http://dev.jquery.com/ticket/255
jQuery.fn.sort = function() {
  return this.pushStack( [].sort.apply( this, arguments ), []);
};
