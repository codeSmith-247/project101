let mymodal = new Modal('.list-item .btn');

mymodal.create_input({
    title: 'Supplier Date',
    name:  'date',
    type:  'date',
    placeholder: 'supplier date',
    disabled: true,
});

mymodal.create_input({
    title: 'Bonus Amount',
    name:  'payment',
    type:  'number',
    placeholder: 'supplier payment',
    disabled: true,
    onchange: 'calculate_quantity()',
});

mymodal.create_input({
    title: 'Unit Sack Price',
    name:  'unit_sack',
    type:  'number',
    placeholder: 'supplier quantity',
    disabled: true,
    onchange: 'calculate_quantity()',
});

mymodal.create_input({
    title: 'Unit Paper Price',
    name:  'unit_paper',
    type:  'number',
    placeholder: 'supplier quantity',
    disabled: true,
    onchange: 'calculate_quantity()',
});

mymodal.create_input({
    title: 'Quantity Entitled',
    name:  'quantity',
    type:  'text',
    placeholder: 'supplier quantity',
    disabled: true,
    editable: false,
});

mymodal.create_input({
    title: 'Paper supplier Wants',
    name:  'paper_supply',
    type:  'number',
    placeholder: 'Supply',
    disabled: true,
    onchange:'suplier_credit()',
});

mymodal.create_input({
    title: 'Sack Supplier Wants',
    name:  'sack_supply',
    type:  'number',
    placeholder: 'Supply',
    disabled: true,
    onchange:'suplier_credit()',
});

mymodal.create_input({
    title: 'Credit total',
    name:  'credit',
    type:  'text',
    placeholder: 'Credit',
    disabled: true,
    editable: false,
});


function calculate_quantity() {
    let amount_payed = mymodal.get_input('payment')    == ''? 1 : mymodal.get_input('payment');
    let sack_price   = mymodal.get_input('unit_sack')  == ''? 1 : mymodal.get_input('unit_sack');
    let paper_price  = mymodal.get_input('unit_paper') == ''? 1 : mymodal.get_input('unit_paper');

    console.clear();
    console.log(
        `
            amount_payed: ${amount_payed},
            sack_price: ${sack_price},
            paper_price: ${paper_price}
        `
    )

    let num_of_sack  = parseFloat(amount_payed) / parseFloat(sack_price);
    let num_of_paper = parseFloat(amount_payed) / parseFloat(paper_price);
    num_of_sack = num_of_sack.toFixed(2);
    num_of_paper = num_of_paper.toFixed(2);
    mymodal.set_input('quantity', `${num_of_sack} sack(s) / ${num_of_paper} paper(s)`);



}

function suplier_credit(){
    let num_of_paper_wants = mymodal.get_input('paper_supply')    == ''? 0 : mymodal.get_input('paper_supply');
    let num_0f_sacks_wants   = mymodal.get_input('sack_supply')  == ''? 0 : mymodal.get_input('sack_supply');

    console.clear();
    console.log(
        `
           num_of_paper_wants: ${num_of_paper_wants},
          num_of_sacks_wants: ${num_0f_sacks_wants},
      
        `
    )
    let credit_of_supplier =parseFloat(num_of_paper_wants) + parseFloat(num_0f_sacks_wants);
    credit_of_supplier = credit_of_supplier.toFixed(2);
    mymodal.set_input('credit', `${credit_of_supplier} bags(s)` );
}