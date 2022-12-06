

class Generic_CRUD {

    modal; //the modal object

    //this property holds the function in the form of a string
    //thie function is called anytime the user clicks the save button;
    create_function = 'generic.create_new();';

    //this key word is used in alert message pop ups
    key_word = '';

    //every time the list html is emptied the list_header html is inserted for header ui
    //reason being header ui is cleared ever time list is emptied
    list_header;

    //the object for search operations
    search_param = {
        last_id: '',
        start_date: '',
        end_date: '',
        search: '',
    };

    //this ui callback inserts new ui row evertime a create/search/show_more operation is executed
    ui_callback;

    //this callback updates the ui every time an edit operation is attempted
    set_values_callback;

    //this callback updates the ui every time an update operation is attempted
    update_callback;

    //this callback removes ui row everytime a delete operation is executed
    delete_callback;

    //this object defines the HTTP parameters for input operations and maps them to their corresponding modal input names
    get_input_obj;

    // the properties bellow set the links for all ajax request
    create_link;

    read_link;
    
    update_link;

    edit_link;

    delete_link;

    search_link_date;

    search_link_input;

    show_more_link;

    constructor(modal) {
        this.modal = modal;
    }

    new() {
        //this function clears all the input in a modal, so that new input can be entered to create a new data entry/row
        this.modal.clear_all_input();
        this.modal.set_first_btn_function(this.create_function);
        this.modal.deactivate_second_btn();
        this.modal.open_modal();
    }

    get_data() {

        let data_obj = JSON.stringify(this.get_input_obj);
        data_obj = JSON.parse(data_obj);

        let empty_check = false;

        Object.keys(data_obj).forEach( property => {
            data_obj[property] = this.modal.get_input(data_obj[property]);

            if( this.is_empty( data_obj[property]) ) empty_check = true;

        })

        if(empty_check) return false;

        return data_obj;

    }

    create_new() {
        let data = this.get_data();

        if(!data) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Input',
                text: 'please check all inputs and try again.'
            });
            return data;
        }

        $.ajax({
            method: 'POST',
            url: this.create_link,
            data: data,
            success: (data) => {
    
                if(data == 'success') {
                    this.empty_the_list();
                    this.list_rows();
    
                    this.modal.close_modal();
    
                    Swal.fire({
                        icon: 'success',
                        title: `${this.key_word} Created Successfully`,
                    });
                }
    
                else if (data == 'exists') {
                    Swal.fire({
                        icon: 'error',
                        title: `Unable To Create ${this.key_word}`,
                        text: `The ${this.key_word} already exists`,
                    });
                }
    
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `Unable To Create ${this.key_word}`,
                        text: 'Please contact tech support'
                    });
                }
    
            
                // deactivate_itm('.loader');
            }
        });

    }

    empty_the_list() {
        select('.list-box .inner-content').innerHTML = this.list_header;
    }

    list_rows() {

        $.ajax({
            method: 'get',
            url: this.read_link,
            data: '',
            success: (data) => {

                this.get_last_id(data);
    
                data.forEach( item_data => {
                    this.insert_new_ui(item_data);
                })
    
            }
        })
    }

    get_last_id(data) {
        let data_length = data.length - 1;
        this.search_param.last_id = data[data_length].id;
    }

    insert_new_ui(data) {
        this.ui_callback(data);
    }

    is_empty(value) {
        if(value.length == 0 || value.length == null){
            return true;
        }

        return false;
    }

    edit(id) {

        $.ajax({
            method: 'POST',
            url: this.edit_link,
            data: {id: id},
            success: (data) => {
    
                if(data == 'not_exists') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable To Retrive ' + this.key_word,
                        text: 'Please try again later'
                    })
                }
    
                else {
                    this.set_values(data);
                    this.modal.set_first_btn_function(`generic.update(${data[0].id});`);
                    this.modal.set_second_btn_function(`generic.delete(${data[0].id});`);
                    this.modal.open_modal();
                }
            }
        })
        
    }

    update(id) {

    
        let item_data = this.get_data();
    
        if(!item_data) {
            return item_data;
        }
    
        item_data.id = id;
    
        $.ajax({
            method: 'POST',
            url: this.update_link,
            data: item_data,
            success: (data) => {
    
                if(data == 'success') {

                    this.update_callback(id, item_data);
    
                    this.modal.close_modal();

                    Swal.fire({
                        icon: 'success',
                        title: `${this.key_word} Updated Successfully`,
                    });
                }
    
                else if (data == 'not_exists') {
                    Swal.fire({
                        icon: 'error',
                        title: `Unable To Update ${this.key_word}`,
                        text: `The ${this.key_word} does not exist.`
                    });
                }
    
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `Unable To Update ${this.key_word}`,
                        text: 'Please contact tech support'
                    });
                }
            
                // deactivate_itm('.loader');
            }
        });
        
    }

    delete(id) {
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
                    url: this.delete_link,
                    data: {id: id},
                    success: (data) => {
                        console.log(data);
    
                        if(data == 'success') {
                            Swal.fire({
                                icon: 'success',
                                title: `${this.key_word} Deleted Successfully`,
                            });
            
                            this.modal.close_modal();

                            this.delete_callback(id);
                        }
    
                        if(data == 'error') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Unable To Delete ' + this.key_word,
                                text: 'Please try again'
                            })
                        }
    
                    }
                });
            }
          })
    }

    date_search() {

        this.search_param.start_date = select('.date-search-box .start-date input').value;
        this.search_param.end_date   = select('.date-search-box .end-date input').value;
    
        $.ajax({
            method: 'POST',
            url: this.search_link_date,
            data: {start_date: this.search_param.start_date, end_date: this.search_param.end_date, search: this.search_param.search},
            success: (data) => {
    
                if(data == 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to Filter Date',
                        text: 'Please contact tech support'
                    })
                }
                else if( data.length > 0)
                {
                    this.get_last_id(data);
                    this.empty_the_list();
        
                    data.forEach( item_data => {
                        this.insert_new_ui(item_data);
                    });
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Nothing Between Selected Dates',
                        text: 'Use different dates and try again'
                    })
                }
    
            
            }
        });
        
    }

    input_search() {
        this.search_param.start_date = '';
        this.search_param.end_date   = '';
        this.search_param.search = select('.search_box input').value;
    
        $.ajax({
            method: 'POST',
            url: this.search_link_input,
            data: {search: this.search_param.search},
            success: (data) => {
    
                if(data == 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to Provide Search Result',
                        text: 'Please contact tech support'
                    })
                }
    
                else if( data.length > 0)
                {
                    this.get_last_id(data); 
                    this.empty_the_list();
                    data.forEach( supplier => {
                        this.insert_new_ui(supplier);
                    });
                }
    
                else {
                    this.empty_the_list();

                }
    
            
            }
        });
    }

    set_values(data) {
        this.set_values_callback(data);
    }

    show_more() {

        $.ajax({
            method: 'POST',
            url: this.show_more_link,
            data: {start_date: this.search_param.start_date, end_date: this.search_param.end_date, search: this.search_param.search, last_id: this.search_param.last_id},
            success: (data) => {
    
                if(data == 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to Provide More Result',
                        text: 'Please contact tech support'
                    })
                }
    
                else if( data.length > 0)
                {
                    get_last_id(data);    
                    data.forEach( item_data => {
                        insert_new_ui(item_data);
                    });
                }
    
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'No More Data To Show',
                        text: 'you have reached the end of the list'
                    });
    
                }

            }
        });

    }

}