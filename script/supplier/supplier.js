let mymodal = new Modal('.list-item .btn.edit');


mymodal.create_input({
    title: 'Supplier\'s Name',
    name:  'supplier_name',
    type:  'text',
    placeholder: 'e.g Cementagon Cement Limited',
    disabled: true,
});

mymodal.create_input({
    title: 'Suplier\'s Contact',
    name:  'contact',
    type:  'tel',
    placeholder: 'e.g 0550000000',
    disabled: true,
});

mymodal.create_input({
    title: 'Location',
    name:  'location',
    type:  'text',
    placeholder: 'e.g Accra Circle',
    disabled: true,
});

mymodal.create_input({
    title: 'Supplier Date',
    name:  'date',
    type:  'date',
    placeholder: 'supplier date',
    disabled: true,
});



let generic = new Generic_CRUD(mymodal);

generic.key_word = 'Supplier';

generic.list_header = 
`<div class = 'list-item small p-abs top-left full-hw z-2'>
    <div class = 'col'>Name</div>
    <div class = 'col'>Contact</div>
    <div class = 'col'>Location</div>
    <div class = 'col'>Date</div>
    <div class = 'col'>Action</div>
</div>
`;

generic.ui_callback = new_ui_callback;

generic.set_values_callback = set_value_callback;

generic.update_callback = update_callback;

generic.delete_callback = delete_callback;

generic.get_input_obj = {name: 'supplier_name', contact: 'contact', location: 'location', date: 'date'};

generic.create_link = 'backend/supplier/create_supplier.php';

generic.read_link = 'backend/supplier/list_suppliers.php';

generic.update_link = 'backend/supplier/update_supplier.php';

generic.edit_link = 'backend/supplier/get_supplier.php';

generic.delete_link = 'backend/supplier/delete_supplier.php';

generic.search_link_date = 'backend/supplier/date_search.php';

generic.search_link_input = 'backend/supplier/input_search.php';

generic.show_more_link = 'backend/supplier/show_more.php';

function insert_new_supplier_ui(name, contact, location, date, id) {

    date = date.replace(/ \d\d:\d\d:\d\d/, '');

    let supplier_tab = `
        <div class = 'list-item' supplier_id = '${id}'>

            <div class = 'col'>${name}</div>
            <div class = 'col'>${contact}</div>
            <div class = 'col'>${location}</div>
            <div class = 'col'>${date}</div>

            <div class = 'col'>
                <div class = 'btn edit' onclick = 'generic.edit(${id});'>edit</div>
                <div class = 'btn open'>open</div>
            </div>

        </div>
    `;

    let list = select('.list-box .inner-content');
    list.insertAdjacentHTML('beforeend', supplier_tab);
}

function new_ui_callback(supplier) {
    insert_new_supplier_ui(supplier.name, supplier.contact, supplier.location, supplier.date, supplier.id);
}

function set_value_callback(data) {
    set_supplier_values(data[0].name, data[0].contact, data[0].location, data[0].date);
}

function update_callback(id, supplier_data) {
    let supplier_tab = select(`.list-item[supplier_id = '${id}']`);

    supplier_tab.innerHTML = `

        <div class = 'col'>${supplier_data.name}</div>
        <div class = 'col'>${supplier_data.contact}</div>
        <div class = 'col'>${supplier_data.location}</div>
        <div class = 'col'>${supplier_data.date}</div>

        <div class = 'col'>
            <div class = 'btn edit' onclick = 'generic.edit(${id});'>edit</div>
            <div class = 'btn open'>open</div>
        </div>
    `;
}

function delete_callback(id) {
    select(`.list-item[supplier_id = '${id}']`).remove();
}

function get_last_id(data) {
    let data_length = data.length - 1;
    search_param.last_id = data[data_length].id;
}

function set_supplier_values(name, contact, location, date) {

    mymodal.set_input('supplier_name', name);
    mymodal.set_input('contact', contact);
    mymodal.set_input('location', location);

    date = date.replace(/ \d\d:\d\d:\d\d/, '');
    date = date.replace(/ \d\d:\d\d:\d\d/, '');

    mymodal.set_input('date', date);
}

generic.list_rows();
