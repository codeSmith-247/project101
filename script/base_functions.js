function select(target) {
    return document.querySelector(target);
}

function selectAll(target) {
    return document.querySelectorAll(target);
}

function remove_itm(target, victim) {
    if(typeof(target) == 'string')
        select(target).querySelectorAll(victim).forEach( victim => {
            victim.remove();
        })
        
    else target.querySelectorAll(victim).forEach( victim => {
        victim.remove();
    });
}

function activate_itm(target, class_name = 'active') {
    select(target).classList.add(class_name);
}

function deactivate_itm(target, class_name = 'active') {
    select(target).classList.remove(class_name);
}

function toggle_itm(target, class_name = 'active') {
    select(target).classList.toggle(class_name);
}