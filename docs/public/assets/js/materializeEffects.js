// ==================================================
// Instancias de javascript que necesita materialize
// ==================================================

// El AutoInit, permite inicializar todo lo que tiene que ver con JS en materializecss
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

// $('.dropdown-trigger').dropdown({
//     'hover':true
// });

// $('.modal').modal();
// $('.trigger-modal').modal();
// $('.datepicker').datepicker();
// $('.sidenav').sidenav();
// $('.fixed-action-btn').floatingActionButton();
// $('.materialboxed').materialbox();
// $('.tooltipped').tooltip();
// $('.collapsible').collapsible();
// $('.chips').chips();
// $('.carousel').carousel();

ScrollReveal().reveal('.headline');

// Toasts
function AlertToast(message,icon,color){
    var toastHTML = '<span>'+message+'&nbsp;</span><i class="material-icons'+' '+color+'-text'+'">'+icon+'</i>';
    return M.toast({html: toastHTML, classes: 'rounded'});
}

