// import("./base_functions.js");

//menu object
let menu = {
    menu_box: select('.menu'), // get menu container
    new : select('.menu-item').outerHTML, //get menu item blueprint

    add : (name, icon = '', link = '#', dropdown = false) => {
        let menu_item = menu.new; //copy blueprint

        //insert values for menu item
        menu_item = menu_item.replaceAll('{{name}}', name);
        menu_item = menu_item.replaceAll('{{icon-name}}', icon);
        menu_item = menu_item.replaceAll('{{link}}', link);
        menu_item = dropdown ? menu_item : menu_item.replace('{{drop-down}}', 'active');

        

        //add menu item to menu container 
        menu.menu_box.innerHTML += menu_item;

        //keep track of menu item
        menu.items[name] = {};
        menu.items[name]['main'] = select(`.menu-item[name=${name}]`);
    },

    add_sub : (target, name, icon = '', link = '#', dropdown = false) => {
        let menu_item = menu.new; //copy blueprint

        //insert values for menu item
        menu_item = menu_item.replaceAll('{{name}}', name);
        menu_item = menu_item.replaceAll('{{icon-name}}', icon);
        menu_item = menu_item.replaceAll('{{link}}', link);
        menu_item = menu_item.replaceAll('{{class}}', 'sub');
        menu_item = dropdown ? menu_item : menu_item.replace('{{drop-down}}', 'active');

        

        //add menu item to menu container 
        menu.get_itm(target).querySelector('.drop-down').innerHTML += menu_item;

        //count increment counter for sub-items
        let sub_count = menu.get_itm(target + '] .drop-down').getAttribute('sub');
        
        sub_count = sub_count != null? parseInt(sub_count) + 1 : 1;
        menu.get_itm(target + '] .drop-down').setAttribute('sub', sub_count);

        //keep track of menu item
        menu.items[name] = {};
        menu.items[name]['main'] = select(`.menu-item[name=${name}]`);
    },

    get_itm : (target) => {
        return select(`.menu-item[name=${target}`);
    },

    items : {
        // menu_name : select(menu_name);
    }
}

remove_itm(menu.menu_box, '.menu-item');

menu.add("Dashboard", 'grid-fill', '#', true);
menu.add_sub("Dashboard", "Submarine", 'grid-fill');
menu.add_sub("Submarine", "tangerine", 'grid-fill');

selectAll('.menu-item').forEach( item => {
    item.setAttribute('onclick', 'menu_item(this);');
})

function menu_item(me) {
    me.querySelector('.drop-down').classList.toggle('active');
    console.log('clicked me');
}