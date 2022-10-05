let menu_items = {
    Dashboard : {
        icon : 'house-door-fill',
        link : 'index.html',
        dropdown: true,
        parent: null
    },

    "Supplier Bonus" : {
        icon : 'piggy-bank-fill',
        link : 'suplier_bonus.html',
        dropdown: false,
        parent: null
    },

    "Suppliers" : {
        icon : 'truck',
        link : 'suplier.html',
        dropdown: false,
        parent: null
    },

    "Customers" : {
        icon : 'people-fill',
        link : 'customers_list.html',
        dropdown: false,
        parent: null
    },

    "Exit" : {
        icon : 'box-arrow-left',
        link : '#',
        dropdown: false,
        parent: null
    },

    Submarine : {
        icon : 'car-fill',
        link : '#',
        dropdown: true,
        parent: "Dashboard"
    },

    Tangerine : {
        icon : 'heart-fill',
        link : '#',
        dropdown: false,
        parent: "Submarine"
    },
}