let mymodal = new Modal('.list-item .btn.edit');

mymodal.create_input({
    title: 'Supplier\'s Name',
    name:  'supplier_name',
    type:  'text',
    placeholder: 'Driver\'s Name',
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

    // activate_itm('.loader');

    $.ajax({
        method: 'POST',
        url: '',
        data: {},
        success: (data) => {
            console.log(data);

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
}