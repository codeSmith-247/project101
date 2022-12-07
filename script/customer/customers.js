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

function open_new_customer() {
    mymodal.clear_all_input();
    mymodal.set_first_btn_function('create_new_customer();');
    mymodal.deactivate_second_btn();
    mymodal.open_modal();
}

function get_customer_data() {
    let customer_name = mymodal.get_input('customer_name');
    let contact       = mymodal.get_input('contact');
    let location      = mymodal.get_input('location');
    let date          = mymodal.get_input('date');

    if(is_empty(customer_name) || is_empty(contact) || is_empty(location)) {

        Swal.fire({
            icon: 'error',
            title: 'Empty Input',
            text: 'Please check all input fields and try again!'
        })

        return false;
    }

    return {name: customer_name, contact: contact, location: location, date: date};
}

function create_new_customer() {

    // activate_itm('.loader');
    let data = get_customer_data();

    if(!data) {
        return data;
    }

    $.ajax({
        method: 'POST',
        url: 'backend/supplier/create_supplier.php',
        data: data,
        success: (data) => {

            if(data == 'success') {
                empty_the_list();
                list_suppliers();

                mymodal.close_modal();

                Swal.fire({
                    icon: 'success',
                    title: 'User Created Successfully',
                });
            }

            else if (data == 'exists') {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable To Create Supplier',
                    text: 'The Supplier already exists',
                });
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable To Create Supplier',
                    text: 'Please contact tech support'
                });
            }

        
            // deactivate_itm('.loader');
        }
    });
}

function insert_new_supplier_ui(name, contact, location, date, id) {

    date = date.replace(/ \d\d:\d\d:\d\d/, '');

    let supplier_tab = `
        <div class = 'list-item' supplier_id = '${id}'>

            <div class = 'col'>${name}</div>
            <div class = 'col'>${contact}</div>
            <div class = 'col'>${location}</div>
            <div class = 'col'>${date}</div>

            <div class = 'col'>
                <div class = 'btn edit' onclick = 'edit_supplier(${id});'>edit</div>
                <div class = 'btn open'>open</div>
            </div>

        </div>
    `;

    let list = select('.list-box .inner-content');
    list.insertAdjacentHTML('beforeend', supplier_tab);
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
                insert_new_supplier_ui(supplier.name, supplier.contact, supplier.location, supplier.date, supplier.id);
            })
        }
    })
}


function empty_the_list() {
    let list_header = `
    <div class = 'list-item small p-abs top-left full-hw z-2'>
        <div class = 'col'>Name</div>
        <div class = 'col'>Contact</div>
        <div class = 'col'>Location</div>
        <div class = 'col'>Date</div>
        <div class = 'col'>Action</div>
    </div>
    `;

    select('.list-box .inner-content').innerHTML = list_header;
}

function edit_supplier(id) {

    $.ajax({
        method: 'POST',
        url: 'backend/supplier/get_supplier.php',
        data: {id: id},
        success: (data) => {

            if(data == 'not_exists') {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable To Retrive Supplier',
                    text: 'Please try again later'
                })
            }

            else {
                set_supplier_values(data[0].name, data[0].contact, data[0].location, data[0].date);
                mymodal.set_first_btn_function(`update_supplier(${data[0].id});`);
                mymodal.set_second_btn_function(`delete_supplier(${data[0].id});`);
                mymodal.open_modal();
            }
        }
    })
}

function set_supplier_values(name, contact, location, date) {

    mymodal.set_input('supplier_name', name);
    mymodal.set_input('contact', contact);
    mymodal.set_input('location', location);

    date = date.replace(/ \d\d:\d\d:\d\d/, '');
    date = date.replace(/ \d\d:\d\d:\d\d/, '');

    mymodal.set_input('date', date);
}

function delete_supplier(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: 'POST',
                url: 'backend/supplier/delete_supplier.php',
                data: {id: id},
                success: (data) => {
                    console.log(data);

                    if(data == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Supplier Deleted Successfully',
                        });
        
                        mymodal.close_modal();
                        select(`.list-item[supplier_id = '${id}']`).remove();
                    }

                    if(data == 'error') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Unable To Delete Supplier',
                            text: 'Please try again'
                        })
                    }


                }
            });
        }
      })

}

function update_supplier(id) {
    let supplier_data = get_supplier_data();

    if(!supplier_data) {
        return supplier_data;
    }

    supplier_data.id = id;

    $.ajax({
        method: 'POST',
        url: 'backend/supplier/update_supplier.php',
        data: supplier_data,
        success: (data) => {

            if(data == 'success') {
                let supplier_tab = select(`.list-item[supplier_id = '${id}']`);

                supplier_tab.innerHTML = `
        
                    <div class = 'col'>${supplier_data.name}</div>
                    <div class = 'col'>${supplier_data.contact}</div>
                    <div class = 'col'>${supplier_data.location}</div>
                    <div class = 'col'>${supplier_data.date}</div>
        
                    <div class = 'col'>
                        <div class = 'btn edit' onclick = 'edit_supplier(${id});'>edit</div>
                        <div class = 'btn open'>open</div>
                    </div>
                `;

                mymodal.close_modal();
                Swal.fire({
                    icon: 'success',
                    title: 'User Updated Successfully',
                });
            }

            else if (data == 'not_exists') {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable To Update Supplier',
                    text: 'The supplier does not exist.'
                });
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable To Update Supplier',
                    text: 'Please contact tech support'
                });
            }

        
            // deactivate_itm('.loader');
        }
    });
}

list_suppliers();