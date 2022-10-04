
class Modal {

    modal_case = `

                    <div class = 'mymodal-case p-fix top-left full-vhw ov-hidden {{classname}}'>
                
                        <div class = 'mymodal p-abs p-center ov-hidden'>
                        
                        <div class = 'modal-top flex-row flex-between p-abs top-left full-w'>
                            <h4 class = 'modal-title'>Modal Top</h4>
                            <div class = 'modal-close-btn'>
                            <div class = 'close-x flex-center round pointer'>
                                <i class = 'bi bi-x-lg'></i>
                            </div>
                            </div>
                        </div>
                    
                        <div class = 'modal-middle'>
                            
                    
                        </div>
                        
                        <div class = 'modal-bottom flex-row flex-center p-abs btm-left full-w'>
                            <div class = 'modal-btn flex-center full-w pointer'>
                                Save
                            </div>
                        </div>
                        
                        </div>
                
                    </div>
    
    `;

    modal_input = `

                    <div class = 'modal-tab {{classname}}'>
                
                        <div class = 'title'>
                        <h6>{{title}}</h6>
                        </div>

                        <div class = 'info p-rel'>

                            <input type = '{{type}}' name = '{{name}}' placeholder = '{{placeholder}}' value = '{{value}}' {{state}} class = 'full-w inputitem'>

                            <div class = 'modal-edit-btn p-abs flex-center top-right full-h {{editable}}' onclick = 'enable_input(this); {{functions}}'>
                                <div class = 'edit-btn flex-center pointer'>
                                <i class = 'bi bi-pencil-square'></i>
                                </div>
                            </div>

                        </div>


                    </div>
    
    `;

    modal_textarea = `

                    <div class = 'modal-tab {{classname}}'>

                        <div class = 'title'>
                        <h6>{{title}}</h6>
                        </div>

                        <div class = 'info p-rel'>

                            <textarea type = 'text' name = '{{name}}' placeholder = '{{placeholder}}' value = '{{value}}' {{state}} class = 'full-w inputitem'></textarea>

                            <div class = 'modal-edit-btn p-abs flex-center top-right full-h {{editable}}' onclick = 'enable_input(this); {{functions}}'>
                                <div class = 'edit-btn flex-center pointer'>
                                <i class = 'bi bi-pencil-square'></i>
                                </div>
                            </div>

                        </div>


                    </div>

    `;

    constructor(trigger_man) {

        this.classname = 'unique' + Date.now().toString(); //this allows multiple modals to be created with different class names
        this.modal_case = this.modal_case.replace('{{classname}}', this.classname);

        select('body').innerHTML += this.modal_case;
        select(trigger_man).setAttribute('onclick', `activate_itm(".${this.classname}")`);
        select(`.${this.classname} .close-x`).setAttribute('onclick', `deactivate_itm(".${this.classname}")`);
    } 

    
    create_input(input_obj = {}, type = 'input') {

        let input_obj_checker = {
            type:        '',
            name:        '',
            title:       '',
            value:       '',
            classname:   '',
            placeholder: '',
            disabled: false,
            editable: true,
            functions: '',
        }

        let input_obj_keys = Object.keys(input_obj_checker);

        input_obj_keys.forEach(property => {
            if (!input_obj[property]) {

                input_obj[property] = '';

                if(property == 'disabled') input_obj[property] = false;
                else if(property == 'editable') input_obj[property] = true;
                else if(property == 'type') input_obj[property] = 'text';

            }

        });

        let input = type == 'input'? this.modal_input.replace('{{classname}}', input_obj.classname) 
                                   : this.modal_textarea.replace('{{classname}}', input_obj.classname);

        input = input.replace('{{title}}', input_obj.title);
        input = input.replace('{{type}}', input_obj.type);
        input = input.replace('{{name}}', input_obj.name);
        input = input.replace('{{value}}', input_obj.value);
        input = input.replace('{{functions}}', input_obj.functions);
        input = input.replace('{{placeholder}}', input_obj.placeholder);

        if(input_obj.disabled) {
            input = input.replace('{{state}}', 'disabled');
        }
        
        if(input_obj.editable) {
            input = input.replace('{{editable}}', 'active');
        }

        select(`.${this.classname}`).querySelector('.modal-middle').innerHTML += input;
    }

    get_input(name) {
        return select(`.${this.classname} .inputitem[name = "${name}"]`).value;
    }

}

function enable_input(elem) {
    let parent = elem.parentElement.querySelector('.inputitem').removeAttribute('disabled');
}