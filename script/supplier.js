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

function open_new_supplier() {
    mymodal.clear_all_input();
    mymodal.set_btn_function('create_new_supplier();');
    mymodal.open_modal();
}

function create_new_supplier() {
    let supplier_name = mymodal.get_input('supplier_name');
    let contact       = mymodal.get_input('contact');
    let location      = mymodal.get_input('location');
    let date          = mymodal.get_input('date');

    if(is_empty(supplier_name) || is_empty(contact) || is_empty(location) || is_empty(date)) {

        Swal.fire({
            icon: 'error',
            title: 'Empty Input',
            text: 'Please check all input fields and try again!'
        })

        return false;
    }

    // activate_itm('.loader');

    $.ajax({
        method: 'POST',
        url: 'backend/supplier/create_supplier.php',
        data: {name: supplier_name, contact: contact, location: location, date: date},
        success: (data) => {

            console.log(data);

            insert_new_supplier_ui(supplier_name, contact, location, date);

            mymodal.close_modal();
            // deactivate_itm('.loader');
        }
    });
}

function insert_new_supplier_ui(name, contact, location, date) {

    let supplier_tab = `
        <div class = 'list-item'>

            <div class = 'col'>${name}</div>
            <div class = 'col'>${contact}</div>
            <div class = 'col'>${location}</div>
            <div class = 'col'>${date}</div>

            <div class = 'col'>
                <div class = 'btn edit'>edit</div>
                <div class = 'btn open'>open</div>
            </div>

        </div>
    `;

    let list = select('.list-box .inner-content');
    list.insertAdjacentHTML('afterbegin', supplier_tab);
}

function is_empty(value) {
    if (value.length == 0) {
        return true;
    }

    return false;
}

function list_suppliers() {

    $.ajax({
        method: 'get',
        url: 'backend/supplier/list_suppliers.php',
        data: '',
        success: (data) => {
            console.log(data);

            data.forEach( supplier => {
                insert_new_supplier_ui(supplier.name, supplier.contact, supplier.location, supplier.date);
            })
        }
    })
}

list_suppliers();