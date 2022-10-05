let mymodal = new Modal( '.list-item .btn');

mymodal.create_input({
    title:'Customer Date',
    name: 'CDate',
    type: 'Date',
    placeholder: 'customers Date',
    disabled: true,

});

mymodal.create_input({
    title: 'Amount paid',
    name: 'payment',
    type:'number',
    placeholder: 'Customer payment',
    disabled: true,

});

mymodal.create_input({
    title:'Amount per Bag',
    name: 'Amount_per_Bag',
    type: 'number',
    placeholder: 'Amount per bag',
    disabled: true,
});

mymodal.create_input({
    title: 'Quantity',
    name: 'quantity',
    type: 'text',
    placeholder: 'customer Quantity',
    disabled: true,

});

mymodal.create_input({
    title: 'Supply',
    name: 'Supply',
    type: 'number',
    placeholder: 'Supply',
    disabled: true,

});

mymodal.create_input({
    title: 'Credit',
    name: 'Credit',
    type: 'text',
    placeholder: 'Credit',
    disabled: true,
    editable: false,
});

mymodal.create_input({
    title: 'Debit',
    name: 'Debit',
    type: 'text',
    placeholder:'Debit',
    disabled: true,
    editable: false,


});

