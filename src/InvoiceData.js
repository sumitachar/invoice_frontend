const customers = [
    {
        "customer_id": "CUST-1000",
        "name": "Stephanie Morris",
        "email": "emily91@hotmail.com",
        "address": "22053 Jorge Canyon, East Laura, PA 90027"
    },
    {
        "customer_id": "CUST-1001",
        "name": "Cynthia Thompson",
        "email": "laurieguerrero@gates.com",
        "address": "673 Mcpherson Drive, South Donald, SC 47461"
    },
    {
        "customer_id": "CUST-1002",
        "name": "David Fernandez",
        "email": "patricia24@wallace-jensen.net",
        "address": "51751 Brandi Springs Apt. 499, North Lauraport, AZ 79576"
    },
    {
        "customer_id": "CUST-1003",
        "name": "Bradley Pham",
        "email": "vking@watson.biz",
        "address": "89022 Michelle Haven, Laurafort, CT 54767"
    },
    {
        "customer_id": "CUST-1004",
        "name": "Todd Brooks MD",
        "email": "troyochoa@thompson-mayo.info",
        "address": "24558 Miranda Divide Apt. 461, Bettymouth, AL 10883"
    },
    {
        "customer_id": "CUST-1005",
        "name": "Martha Vazquez",
        "email": "youngmary@gmail.com",
        "address": "3921 Juan Glen Suite 182, New Rachel, KS 41969"
    },
    {
        "customer_id": "CUST-1006",
        "name": "Lisa Cross",
        "email": "jle@parks-howard.com",
        "address": "383 Brittany Expressway, East Nancy, RI 63375"
    },
    {
        "customer_id": "CUST-1007",
        "name": "David Haynes",
        "email": "raymond81@hotmail.com",
        "address": "26731 Ross Ports Apt. 930, Port Scottstad, AR 33621"
    },
    {
        "customer_id": "CUST-1008",
        "name": "Ryan Roberts",
        "email": "xstephens@buchanan.org",
        "address": "88369 Nguyen Trail, Smithbury, MN 75239"
    },
    {
        "customer_id": "CUST-1009",
        "name": "Traci Cole",
        "email": "kimberly58@graves-henry.org",
        "address": "534 Cruz Land Apt. 322, North Kellytown, MO 08765"
    },
    {
        "customer_id": "CUST-1010",
        "name": "Linda Klein",
        "email": "eshepard@hotmail.com",
        "address": "358 Clark Fall, West Robertside, NM 99017"
    },
    {
        "customer_id": "CUST-1011",
        "name": "Robert Walker",
        "email": "sjones@gmail.com",
        "address": "1944 Mccoy Landing, Tyronehaven, NV 46641"
    },
    {
        "customer_id": "CUST-1012",
        "name": "Adam Walker",
        "email": "torresashley@riddle.org",
        "address": "3128 Brian Route, Michaelfort, RI 45894"
    },
    {
        "customer_id": "CUST-1013",
        "name": "Rebecca Shepard",
        "email": "traceystephens@hotmail.com",
        "address": "USCGC Brooks, FPO AP 63854"
    },
    {
        "customer_id": "CUST-1014",
        "name": "Morgan Bryant",
        "email": "wevans@hotmail.com",
        "address": "9753 Hayley Flat Apt. 524, Emilyshire, NM 22084"
    },
    {
        "customer_id": "CUST-1015",
        "name": "Steven King",
        "email": "ojenkins@stout.biz",
        "address": "506 Hannah Coves Suite 530, Lake Carol, VT 06643"
    },
    {
        "customer_id": "CUST-1016",
        "name": "Jason Anderson",
        "email": "matthewsmichael@yahoo.com",
        "address": "58923 Nelson Walk Apt. 203, Lake Christinefort, CA 80912"
    },
    {
        "customer_id": "CUST-1017",
        "name": "Christopher Mejia",
        "email": "allenroberto@yahoo.com",
        "address": "Unit 9368 Box 0098, DPO AA 67778"
    },
    {
        "customer_id": "CUST-1018",
        "name": "Rebecca Warren",
        "email": "zterrell@gmail.com",
        "address": "16018 Richard Rapids, Port Martha, OK 14272"
    },
    {
        "customer_id": "CUST-1019",
        "name": "Ryan Adkins",
        "email": "jessicaalexander@yahoo.com",
        "address": "09854 Clark Trail Apt. 662, New Elizabeth, NM 38061"
    },
    {
        "customer_id": "CUST-1020",
        "name": "John Ramirez",
        "email": "herrerajessica@foster-hardin.net",
        "address": "USS Mcdowell, FPO AP 43256"
    },
    {
        "customer_id": "CUST-1021",
        "name": "Matthew Davis",
        "email": "morganalexander@kelly.com",
        "address": "Unit 5522 Box 9412, DPO AA 72476"
    },
    {
        "customer_id": "CUST-1022",
        "name": "Jennifer Salazar",
        "email": "taramassey@ellison-clark.com",
        "address": "4551 Robinson Burg, Lake Danielland, ME 61781"
    },
    {
        "customer_id": "CUST-1023",
        "name": "Cassandra Galloway",
        "email": "patricia93@yahoo.com",
        "address": "6828 David Ferry, Martinborough, IL 66003"
    },
    {
        "customer_id": "CUST-1024",
        "name": "Tonya Decker",
        "email": "bgibson@yahoo.com",
        "address": "263 Wright Dam Apt. 746, Christopherport, MN 94667"
    },
    {
        "customer_id": "CUST-1025",
        "name": "Katrina Foster",
        "email": "danielfields@walker.com",
        "address": "Unit 9243 Box 2847, DPO AE 16742"
    },
    {
        "customer_id": "CUST-1026",
        "name": "Meghan Cline",
        "email": "kjones@hotmail.com",
        "address": "PSC 9901, Box 8913, APO AA 22601"
    },
    {
        "customer_id": "CUST-1027",
        "name": "Kimberly Wright",
        "email": "jwilson@gmail.com",
        "address": "680 Robertson Mews, New Cheryl, DE 79143"
    },
    {
        "customer_id": "CUST-1028",
        "name": "Kristen Garza",
        "email": "teresanorton@yahoo.com",
        "address": "3505 Andrew Highway, Reynoldsborough, IL 56250"
    },
    {
        "customer_id": "CUST-1029",
        "name": "Patricia Burch",
        "email": "carterdenise@hotmail.com",
        "address": "PSC 1176, Box 3568, APO AP 26916"
    }
]


const invoices = [
    {
        "invoice_id": "INV-2000",
        "customer_id": "CUST-1000",
        "invoice_no": "INV-1000",
        "invoice_date": "2024-01-02",
        "subtotal": 72.12,
        "tax": 12.98,
        "grand_total": 85.1
    },
    {
        "invoice_id": "INV-2001",
        "customer_id": "CUST-1003",
        "invoice_no": "INV-1001",
        "invoice_date": "2022-12-24",
        "subtotal": 1246.82,
        "tax": 224.43,
        "grand_total": 1471.25
    },
    {
        "invoice_id": "INV-2002",
        "customer_id": "CUST-1008",
        "invoice_no": "INV-1002",
        "invoice_date": "2021-07-29",
        "subtotal": 547.97,
        "tax": 98.63,
        "grand_total": 646.6
    },
    {
        "invoice_id": "INV-2003",
        "customer_id": "CUST-1009",
        "invoice_no": "INV-1003",
        "invoice_date": "2020-09-20",
        "subtotal": 995.3399999999999,
        "tax": 179.16,
        "grand_total": 1174.5
    },
    {
        "invoice_id": "INV-2004",
        "customer_id": "CUST-1004",
        "invoice_no": "INV-1004",
        "invoice_date": "2023-02-28",
        "subtotal": 4580.4,
        "tax": 824.47,
        "grand_total": 5404.87
    },
    {
        "invoice_id": "INV-2005",
        "customer_id": "CUST-1002",
        "invoice_no": "INV-1005",
        "invoice_date": "2025-02-22",
        "subtotal": 1651.8300000000002,
        "tax": 297.33,
        "grand_total": 1949.16
    },
    {
        "invoice_id": "INV-2005",
        "customer_id": "CUST-1502",
        "invoice_no": "INV-1005",
        "invoice_date": "2025-02-22",
        "subtotal": 1651.8300000000002,
        "tax": 297.33,
        "grand_total": 1249.16
    },
    {
        "invoice_id": "INV-2006",
        "customer_id": "CUST-1014",
        "invoice_no": "INV-1006",
        "invoice_date": "2021-03-20",
        "subtotal": 1830.21,
        "tax": 329.44,
        "grand_total": 2159.65
    },
    {
        "invoice_id": "INV-2007",
        "customer_id": "CUST-1011",
        "invoice_no": "INV-1007",
        "invoice_date": "2021-05-21",
        "subtotal": 863.09,
        "tax": 155.36,
        "grand_total": 1018.45
    },
    {
        "invoice_id": "INV-2008",
        "customer_id": "CUST-1004",
        "invoice_no": "INV-1008",
        "invoice_date": "2020-10-09",
        "subtotal": 686.7,
        "tax": 123.61,
        "grand_total": 810.31
    },
    {
        "invoice_id": "INV-2009",
        "customer_id": "CUST-1009",
        "invoice_no": "INV-1009",
        "invoice_date": "2023-01-20",
        "subtotal": 1306.5499999999997,
        "tax": 235.18,
        "grand_total": 1541.73
    },
    {
        "invoice_id": "INV-2010",
        "customer_id": "CUST-1013",
        "invoice_no": "INV-1010",
        "invoice_date": "2021-09-21",
        "subtotal": 2355.42,
        "tax": 423.98,
        "grand_total": 2779.4
    },
    {
        "invoice_id": "INV-2011",
        "customer_id": "CUST-1014",
        "invoice_no": "INV-1011",
        "invoice_date": "2020-07-22",
        "subtotal": 2767.79,
        "tax": 498.2,
        "grand_total": 3265.99
    },
    {
        "invoice_id": "INV-2012",
        "customer_id": "CUST-1003",
        "invoice_no": "INV-1012",
        "invoice_date": "2024-02-08",
        "subtotal": 425.84999999999997,
        "tax": 76.65,
        "grand_total": 502.5
    },
    {
        "invoice_id": "INV-2013",
        "customer_id": "CUST-1002",
        "invoice_no": "INV-1013",
        "invoice_date": "2020-12-10",
        "subtotal": 3266.52,
        "tax": 587.97,
        "grand_total": 3854.49
    },
    {
        "invoice_id": "INV-2014",
        "customer_id": "CUST-1004",
        "invoice_no": "INV-1014",
        "invoice_date": "2020-01-21",
        "subtotal": 1256.92,
        "tax": 226.25,
        "grand_total": 1483.17
    },
    {
        "invoice_id": "INV-2015",
        "customer_id": "CUST-1005",
        "invoice_no": "INV-1015",
        "invoice_date": "2020-09-16",
        "subtotal": 2871.4399999999996,
        "tax": 516.86,
        "grand_total": 3388.3
    },
    {
        "invoice_id": "INV-2016",
        "customer_id": "CUST-1002",
        "invoice_no": "INV-1016",
        "invoice_date": "2022-06-25",
        "subtotal": 4248.24,
        "tax": 764.68,
        "grand_total": 5012.92
    },
    {
        "invoice_id": "INV-2017",
        "customer_id": "CUST-1012",
        "invoice_no": "INV-1017",
        "invoice_date": "2023-03-13",
        "subtotal": 380.04,
        "tax": 68.41,
        "grand_total": 448.45
    },
    {
        "invoice_id": "INV-2018",
        "customer_id": "CUST-1008",
        "invoice_no": "INV-1018",
        "invoice_date": "2023-10-10",
        "subtotal": 277.44,
        "tax": 49.94,
        "grand_total": 327.38
    },
    {
        "invoice_id": "INV-2019",
        "customer_id": "CUST-1007",
        "invoice_no": "INV-1019",
        "invoice_date": "2021-08-16",
        "subtotal": 221.88,
        "tax": 39.94,
        "grand_total": 261.82
    },
    {
        "invoice_id": "INV-2020",
        "customer_id": "CUST-1006",
        "invoice_no": "INV-1020",
        "invoice_date": "2020-06-18",
        "subtotal": 396.88,
        "tax": 71.44,
        "grand_total": 468.32
    },
    {
        "invoice_id": "INV-2021",
        "customer_id": "CUST-1004",
        "invoice_no": "INV-1021",
        "invoice_date": "2022-04-08",
        "subtotal": 824.55,
        "tax": 148.42,
        "grand_total": 972.97
    },
    {
        "invoice_id": "INV-2022",
        "customer_id": "CUST-1004",
        "invoice_no": "INV-1022",
        "invoice_date": "2020-04-09",
        "subtotal": 2381.1800000000003,
        "tax": 428.61,
        "grand_total": 2809.79
    },
    {
        "invoice_id": "INV-2023",
        "customer_id": "CUST-1012",
        "invoice_no": "INV-1023",
        "invoice_date": "2021-11-01",
        "subtotal": 322.7,
        "tax": 58.09,
        "grand_total": 380.79
    },
    {
        "invoice_id": "INV-2024",
        "customer_id": "CUST-1014",
        "invoice_no": "INV-1024",
        "invoice_date": "2022-03-17",
        "subtotal": 611.3399999999999,
        "tax": 110.04,
        "grand_total": 721.38
    },
    {
        "invoice_id": "INV-2025",
        "customer_id": "CUST-1001",
        "invoice_no": "INV-1025",
        "invoice_date": "2024-11-10",
        "subtotal": 3657.29,
        "tax": 658.31,
        "grand_total": 4315.6
    },
    {
        "invoice_id": "INV-2026",
        "customer_id": "CUST-1011",
        "invoice_no": "INV-1026",
        "invoice_date": "2023-09-15",
        "subtotal": 1595.13,
        "tax": 287.12,
        "grand_total": 1882.25
    },
    {
        "invoice_id": "INV-2027",
        "customer_id": "CUST-1002",
        "invoice_no": "INV-1027",
        "invoice_date": "2021-10-29",
        "subtotal": 1450.46,
        "tax": 261.08,
        "grand_total": 1711.54
    },
    {
        "invoice_id": "INV-2028",
        "customer_id": "CUST-1010",
        "invoice_no": "INV-1028",
        "invoice_date": "2024-02-19",
        "subtotal": 4976.49,
        "tax": 895.77,
        "grand_total": 5872.26
    },
    {
        "invoice_id": "INV-2029",
        "customer_id": "CUST-1010",
        "invoice_no": "INV-1029",
        "invoice_date": "2023-10-30",
        "subtotal": 1135.47,
        "tax": 204.38,
        "grand_total": 1339.85
    }
]

const invoice_items = [
    {
        "item_id": "ITEM-4000",
        "invoice_id": "INV-3000",
        "invoiceDate": "2024-02-01",
        "product": "Widget Pro",
        "pack": "Box of 5",
        "qty": 10,
        "free": 2,
        "rate": 49.99,
        "mrp": 59.99,
        "discount": 10,
        "gross": 499.90,
        "taxable": 449.91,
        "gst_percent": 18,
        "gst_amount": 80.98,
        "net_amount": 530.89,
        "mfgDate": "2024-01-15",
        "expDate": "2026-01-15"
    },
    {
        "item_id": "ITEM-4001",
        "invoice_id": "INV-3001",
        "invoiceDate": "2024-02-02",
        "product": "Gadget X",
        "pack": "Box of 3",
        "qty": 5,
        "free": 1,
        "rate": 99.99,
        "mrp": 119.99,
        "discount": 15,
        "gross": 499.95,
        "taxable": 424.96,
        "gst_percent": 12,
        "gst_amount": 50.99,
        "net_amount": 475.95,
        "mfgDate": "2023-12-10",
        "expDate": "2025-12-10"
    },
    {
        "item_id": "ITEM-4001",
        "invoice_id": "INV-3002",
        "invoiceDate": "2025-02-17",
        "product": "Gadget X",
        "pack": "Box of 3",
        "qty": 5,
        "free": 1,
        "rate": 99.99,
        "mrp": 119.99,
        "discount": 15,
        "gross": 499.95,
        "taxable": 424.96,
        "gst_percent": 12,
        "gst_amount": 50.99,
        "net_amount": 475.95,
        "mfgDate": "2023-12-10",
        "expDate": "2025-12-10"
    },
    {
        "item_id": "ITEM-4001",
        "invoice_id": "INV-3001",
        "invoiceDate": "2024-02-02",
        "product": "Gadget X",
        "pack": "Box of 3",
        "qty": 5,
        "free": 1,
        "rate": 99.99,
        "mrp": 119.99,
        "discount": 15,
        "gross": 499.95,
        "taxable": 424.96,
        "gst_percent": 12,
        "gst_amount": 50.99,
        "net_amount": 475.95,
        "mfgDate": "2023-12-10",
        "expDate": "2025-12-10"
    },
    {
        "item_id": "ITEM-4002",
        "invoice_id": "INV-3002",
        "invoiceDate": "2024-02-03",
        "product": "Super Cable",
        "pack": "Pack of 10",
        "qty": 20,
        "free": 3,
        "rate": 5.49,
        "mrp": 6.99,
        "discount": 5,
        "gross": 109.80,
        "taxable": 104.31,
        "gst_percent": 5,
        "gst_amount": 5.22,
        "net_amount": 109.53,
        "mfgDate": "2024-02-05",
        "expDate": "2027-02-05"
    },
    {
        "item_id": "ITEM-4003",
        "invoice_id": "INV-3003",
        "invoiceDate": "2024-02-04",
        "product": "Laptop Stand",
        "pack": "Single",
        "qty": 2,
        "free": 0,
        "rate": 34.99,
        "mrp": 44.99,
        "discount": 7,
        "gross": 69.98,
        "taxable": 65.08,
        "gst_percent": 18,
        "gst_amount": 11.71,
        "net_amount": 76.79,
        "mfgDate": "2023-11-20",
        "expDate": "2026-11-20"
    },
    {
        "item_id": "ITEM-4004",
        "invoice_id": "INV-3004",
        "invoiceDate": "2025-02-22",
        "product": "Wireless Mouse",
        "pack": "Single",
        "qty": 8,
        "free": 1,
        "rate": 19.99,
        "mrp": 24.99,
        "discount": 8,
        "gross": 159.92,
        "taxable": 147.13,
        "gst_percent": 12,
        "gst_amount": 17.66,
        "net_amount": 164.79,
        "mfgDate": "2024-01-25",
        "expDate": "2026-01-25"
    },
    {
        "item_id": "ITEM-4004",
        "invoice_id": "INV-3006",
        "invoiceDate": "2025-02-22",
        "product": "Wireless Mouse",
        "pack": "Single",
        "qty": 8,
        "free": 1,
        "rate": 19.99,
        "mrp": 24.99,
        "discount": 8,
        "gross": 159.92,
        "taxable": 147.13,
        "gst_percent": 12,
        "gst_amount": 17.66,
        "net_amount": 164.79,
        "mfgDate": "2024-01-25",
        "expDate": "2026-01-25"
    },
    {
        "item_id": "ITEM-4005",
        "invoice_id": "INV-3006",
        "invoiceDate": "2024-02-22",
        "product": "Gaming Keyboard",
        "pack": "Single",
        "qty": 4,
        "free": 0,
        "rate": 79.99,
        "mrp": 99.99,
        "discount": 10,
        "gross": 319.96,
        "taxable": 287.96,
        "gst_percent": 18,
        "gst_amount": 51.83,
        "net_amount": 339.79,
        "mfgDate": "2023-10-05",
        "expDate": "2026-10-05"
    },
    {
        "item_id": "ITEM-4006",
        "invoice_id": "INV-3006",
        "invoiceDate": "2024-02-07",
        "product": "Smartphone Case",
        "pack": "Pack of 2",
        "qty": 12,
        "free": 2,
        "rate": 9.99,
        "mrp": 12.99,
        "discount": 5,
        "gross": 119.88,
        "taxable": 113.89,
        "gst_percent": 5,
        "gst_amount": 5.69,
        "net_amount": 119.58,
        "mfgDate": "2023-12-18",
        "expDate": "2026-12-18"
    },
    {
        "item_id": "ITEM-4007",
        "invoice_id": "INV-3007",
        "invoiceDate": "2024-02-08",
        "product": "Noise Cancelling Headphones",
        "pack": "Single",
        "qty": 3,
        "free": 0,
        "rate": 199.99,
        "mrp": 249.99,
        "discount": 20,
        "gross": 599.97,
        "taxable": 479.98,
        "gst_percent": 12,
        "gst_amount": 57.60,
        "net_amount": 537.58,
        "mfgDate": "2023-09-28",
        "expDate": "2026-09-28"
    },
    {
        "item_id": "ITEM-4008",
        "invoice_id": "INV-3008",
        "invoiceDate": "2024-02-09",
        "product": "Portable Hard Drive",
        "pack": "Single",
        "qty": 5,
        "free": 0,
        "rate": 89.99,
        "mrp": 109.99,
        "discount": 10,
        "gross": 449.95,
        "taxable": 404.96,
        "gst_percent": 18,
        "gst_amount": 72.89,
        "net_amount": 477.85,
        "mfgDate": "2024-01-10",
        "expDate": "2027-01-10"
    },
    {
        "item_id": "ITEM-4009",
        "invoice_id": "INV-3009",
        "invoiceDate": "2024-02-10",
        "product": "Bluetooth Speaker",
        "pack": "Single",
        "qty": 6,
        "free": 1,
        "rate": 49.99,
        "mrp": 59.99,
        "discount": 8,
        "gross": 299.94,
        "taxable": 275.95,
        "gst_percent": 12,
        "gst_amount": 33.11,
        "net_amount": 309.06,
        "mfgDate": "2023-11-15",
        "expDate": "2026-11-15"
    },
    {
        "item_id": "ITEM-4010",
        "invoice_id": "INV-3010",
        "invoiceDate": "2024-02-11",
        "product": "USB-C Hub",
        "pack": "Single",
        "qty": 7,
        "free": 1,
        "rate": 29.99,
        "mrp": 39.99,
        "discount": 10,
        "gross": 209.93,
        "taxable": 188.94,
        "gst_percent": 18,
        "gst_amount": 34.01,
        "net_amount": 222.95,
        "mfgDate": "2023-10-01",
        "expDate": "2026-10-01"
    },
    {
        "item_id": "ITEM-4011",
        "invoice_id": "INV-3011",
        "invoiceDate": "2024-02-12",
        "product": "Wireless Charger",
        "pack": "Single",
        "qty": 10,
        "free": 2,
        "rate": 24.99,
        "mrp": 29.99,
        "discount": 5,
        "gross": 249.90,
        "taxable": 237.41,
        "gst_percent": 12,
        "gst_amount": 28.49,
        "net_amount": 265.90,
        "mfgDate": "2024-01-01",
        "expDate": "2026-01-01"
    },
    {
        "item_id": "ITEM-4012",
        "invoice_id": "INV-3012",
        "invoiceDate": "2025-02-20",
        "product": "4K Monitor",
        "pack": "Single",
        "qty": 2,
        "free": 0,
        "rate": 349.99,
        "mrp": 399.99,
        "discount": 15,
        "gross": 699.98,
        "taxable": 594.98,
        "gst_percent": 18,
        "gst_amount": 107.10,
        "net_amount": 702.08,
        "mfgDate": "2023-08-15",
        "expDate": "2026-08-15"
    },
    {
        "item_id": "ITEM-4013",
        "invoice_id": "INV-3013",
        "invoiceDate": "2024-08-15",
        "product": "Mechanical Keyboard",
        "pack": "Single",
        "qty": 5,
        "free": 1,
        "rate": 99.99,
        "mrp": 129.99,
        "discount": 10,
        "gross": 499.95,
        "taxable": 449.96,
        "gst_percent": 18,
        "gst_amount": 80.99,
        "net_amount": 530.95,
        "mfgDate": "2023-07-20",
        "expDate": "2026-07-20"
    },
    {
        "item_id": "ITEM-4014",
        "invoice_id": "INV-3014",
        "invoiceDate": "2024-08-15",
        "product": "Smartwatch",
        "pack": "Single",
        "qty": 3,
        "free": 0,
        "rate": 199.99,
        "mrp": 249.99,
        "discount": 12,
        "gross": 599.97,
        "taxable": 527.97,
        "gst_percent": 12,
        "gst_amount": 63.36,
        "net_amount": 591.33,
        "mfgDate": "2023-09-30",
        "expDate": "2026-09-30"
    },
    {
        "item_id": "ITEM-4015",
        "invoice_id": "INV-3015",
        "invoiceDate": "2024-07-16",
        "product": "VR Headset",
        "pack": "Single",
        "qty": 2,
        "free": 0,
        "rate": 299.99,
        "mrp": 349.99,
        "discount": 10,
        "gross": 599.98,
        "taxable": 539.98,
        "gst_percent": 18,
        "gst_amount": 97.20,
        "net_amount": 637.18,
        "mfgDate": "2023-10-10",
        "expDate": "2026-10-10"
    },
    {
        "item_id": "ITEM-4016",
        "invoice_id": "INV-3016",
        "invoiceDate": "2025-02-17",
        "product": "Noise Cancelling Earbuds",
        "pack": "Single",
        "qty": 6,
        "free": 1,
        "rate": 149.99,
        "mrp": 179.99,
        "discount": 8,
        "gross": 899.94,
        "taxable": 827.95,
        "gst_percent": 12,
        "gst_amount": 99.35,
        "net_amount": 927.30,
        "mfgDate": "2023-11-05",
        "expDate": "2026-11-05"
    },
    {
        "item_id": "ITEM-4017",
        "invoice_id": "INV-3017",
        "invoiceDate": "2025-02-19",
        "product": "External SSD",
        "pack": "Single",
        "qty": 4,
        "free": 0,
        "rate": 129.99,
        "mrp": 159.99,
        "discount": 15,
        "gross": 519.96,
        "taxable": 441.97,
        "gst_percent": 18,
        "gst_amount": 79.55,
        "net_amount": 521.52,
        "mfgDate": "2024-01-20",
        "expDate": "2027-01-20"
    },
    {
        "item_id": "ITEM-4018",
        "invoice_id": "INV-3018",
        "invoiceDate": "2025-02-19",
        "product": "Tablet Stand",
        "pack": "Single",
        "qty": 8,
        "free": 1,
        "rate": 34.99,
        "mrp": 44.99,
        "discount": 10,
        "gross": 279.92,
        "taxable": 251.93,
        "gst_percent": 12,
        "gst_amount": 30.23,
        "net_amount": 282.16,
        "mfgDate": "2023-12-15",
        "expDate": "2026-12-15"
    },
    {
        "item_id": "ITEM-4019",
        "invoice_id": "INV-3019",
        "invoiceDate": "2024-02-20",
        "product": "Ergonomic Chair",
        "pack": "Single",
        "qty": 2,
        "free": 0,
        "rate": 249.99,
        "mrp": 299.99,
        "discount": 15,
        "gross": 499.98,
        "taxable": 424.98,
        "gst_percent": 18,
        "gst_amount": 76.50,
        "net_amount": 501.48,
        "mfgDate": "2023-08-25",
        "expDate": "2027-08-25"
    }

];


export { customers, invoices, invoice_items };


