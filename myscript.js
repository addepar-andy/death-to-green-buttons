function dieGreenButtonDie(element) {
  if (element.className.indexOf("primary") > -1) {
    var enable = null;
    var disable = function() {
      element.className = element.className.replace(/primary/g, 'disabled').replace(/js-details-target/g, '');
      setTimeout(enable, 50);
    }
    enable = function() {
      element.className = element.className.replace(/disabled/g, 'primary');
      setTimeout(disable, 50);
    }
    disable();
  }
}

function observeMergeButton() {
  var target = document.querySelector('body');
  var config = {
    childList: true,
    subtree: true,
    characterData: true
  };

  var observer = new MutationObserver(function(mutations, self) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        var elements = document.querySelectorAll('.merge-branch-action');
        Array.prototype.forEach.call(elements, function(element) {
          dieGreenButtonDie(element);
        });
      }
    });
  });

  observer.observe(target, config);
}

window.onload = function() {
  dieGreenButtonDie(document.querySelector(".merge-branch-action"));
  observeMergeButton();
}

