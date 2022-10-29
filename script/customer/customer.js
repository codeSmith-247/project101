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
    onchange: 'calculate_quantity()', 

});

mymodal.create_input({
    title:'Amount per Bag',
    name: 'Amount_per_Bag',
    type: 'number',
    placeholder: 'Amount per bag',
    disabled: true,
    onchange: 'calculate_quantity()', 

});

mymodal.create_input({
    title: 'Quantity',
    name: 'quantity',
    type: 'text',
    placeholder: 'customer Quantity',
    disabled: true,
    editable:false,
    onchange: 'calculate_credit()',

});

mymodal.create_input({
    title: 'Supply',
    name: 'Supply',
    type: 'number',
    placeholder: 'Supply',
    disabled: true,
    onchange: 'calculate_credit()',

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

 mymodal.create_input({
        title:'Amount customer owe',
        name: 'customer debit',
        type: 'text',
        placeholder: 'Amount customer owe',
        disabled: true,
        editable: false,
    })

 mymodal.create_input({
        title: 'Amount Supplier Owe',
        name: 'Supplier debit',
        type: 'text',
        placeholder: 'Amount user owe ',
        disabled: true,
        editable: false,


    })



function calculate_quantity() {
    let amount_payed = mymodal.get_input('payment')    == ''? 1 : mymodal.get_input('payment');
    let Amount_per_Bag  = mymodal.get_input('Amount_per_Bag')  == ''? 1 : mymodal.get_input('Amount_per_Bag');
  

    console.clear();
    console.log(
        `
            amount_payed: ${amount_payed},
            sack_price: ${Amount_per_Bag},
           
        `
    )

    let Quantity = parseFloat(amount_payed) / parseFloat(Amount_per_Bag);
    Quantity = Quantity.toFixed(2);
   
    mymodal.set_input('quantity', `${Quantity} bag(s) `);
};

function calculate_credit(){
        let Quantity = mymodal.get_input('quantity')== ''? 1 : mymodal.get_input('quantity');
        let Supply = mymodal.get_input('Supply')    == ''? 1 : mymodal.get_input('Supply');
        let Amount_per_Bag  = mymodal.get_input('Amount_per_Bag')  == ''? 1 : mymodal.get_input('Amount_per_Bag');

        console.clear();
        console.log(
            `
                amount_payed: ${Quantity},
                sack_price: ${Supply},
               
            `
        )
    
        let crediter = parseFloat(Supply) - parseFloat(Quantity);

        crediter = crediter.toFixed(2);

       if (crediter > 0){
         mymodal.set_input('Credit', `${crediter} bag(s)`);
         mymodal.set_input('Debit', `0 bag(s)`); // clear the previous debit input( since there is no more debit)



         let profit = crediter * Amount_per_Bag;
         profit = profit.toFixed(2);

         mymodal.set_input('Supplier debit',``); // clear the previous debit input (no more debit input only credit input now)
         mymodal.set_input('customer debit', `${profit}`);
       }
   else    
 {
            mymodal.set_input('Debit', `${crediter} bag(s)`)
            mymodal.set_input('Credit', `0 bag(s)`);  // clear the previous credit input ( since there is no more credit only debit)

            let loss = crediter * Amount_per_Bag;
            loss = loss.toFixed(2);

            mymodal.set_input('customer debit', `${loss}`); // clear the previous debit input ( no more customer debit input only suplier debit now)
            mymodal.set_input('Supplier debit',``); 
        } 
        

}


