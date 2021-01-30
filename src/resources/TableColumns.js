const align = 'center'

const columns = {
    PURCHASE_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Purchase ID', dataIndex: 'purchase_id', align     },
        {   title:  'User Account Number', dataIndex: 'account_no', align    }, 
        {   title:  'Number of Tokens', dataIndex: 'no_token', align    },
        {   title:  'Token Price', dataIndex: 'price', align    },
        {   title:  'Total', dataIndex: 'total', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    SELLING_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Selling ID', dataIndex: 'selling_id', align     },
        {   title:  'User Account Number', dataIndex: 'account_no', align    }, 
        {   title:  'Number of Tokens', dataIndex: 'no_token', align    },
        {   title:  'Token Price', dataIndex: 'price', align    },
        {   title:  'Total', dataIndex: 'total', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    WITHDRAWAL_HISTORY: [
        {   title:  'Request Number', dataIndex: 'request_no', align     },
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Name', dataIndex: 'name', align    }, 
        {   title:  'UPI', dataIndex: 'upi', align    },
        {   title:  'Bank Account Number', dataIndex: 'account_no', align    },
        {   title:  'IFSC Code', dataIndex: 'ifsc', align    },
        {   title:  'Total Amount', dataIndex: 'amount', align    },
    ],
    DIVIDEND_HISTORY: [
        {   title:  'Month + Year', dataIndex: 'month', align     },
        {   title:  'Upload Date', dataIndex: 'date', align    },
        {   title:  'Total Revenue', dataIndex: 'revenue', align    }, 
        {   title:  'Operating Expenses', dataIndex: 'expenses', align    },
        {   title:  'Interest and tax', dataIndex: 'interest', align    },
        {   title:  '15% Service Fee', dataIndex: 'service_fee', align    },
        {   title:  'Net Profit', dataIndex: 'profit', align    },
        {   title:  'Total Tokens', dataIndex: 'total_tokens', align    },
        {   title:  'Dividend per token', dataIndex: 'dividend_token', align    },
    ],
    WITHDRAWAL_REQUEST: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'User ID', dataIndex: 'user_id', align     },
        {   title:  'UPI', dataIndex: 'upi', align    },
        {   title:  'Bank Account Number', dataIndex: 'account_no', align    },
        {   title:  'IFSC Code', dataIndex: 'ifsc', align    },
        {   title:  'Total Withdrawal Amount', dataIndex: 'amount', align    },
    ],
    USER_LIST: [
        {   title:  'User ID', dataIndex: '_id', align     },
        {   title:  'Join Date', dataIndex: 'createdAt', align    },
        {   title:  'Full Name', dataIndex: 'name', align    },
        {   title:  'Phone Number', dataIndex: 'mobileNo', align    },
        {   title:  'Gender', dataIndex: 'gender', align    },
        {   title:  'Total Token Purchase', dataIndex: 'total_token', align    },
        {   title:  'Total Dividend Earned', dataIndex: 'total_dividend', align    },
        {   title:  'Account Balance', dataIndex: 'balance', align    },
    ],
    USER_WITHDRAWAL_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Bank Account Number', dataIndex: 'account_no', align    },
        {   title:  'UPI', dataIndex: 'upi', align    },
        {   title:  'IFSC Code', dataIndex: 'ifsc', align    },
        {   title:  'Total Amount', dataIndex: 'amount', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    USER_PURCHASE_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Purchase ID', dataIndex: 'purchase_id', align     },
        {   title:  'Number of Tokens', dataIndex: 'no_token', align    },
        {   title:  'Purchase Price', dataIndex: 'price', align    },
        {   title:  'Total Amount', dataIndex: 'total', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    USER_SELLING_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Selling ID', dataIndex: 'selling_id', align     },
        {   title:  'Number of Tokens', dataIndex: 'no_token', align    },
        {   title:  'Sell Price', dataIndex: 'price', align    },
        {   title:  'Total Amount', dataIndex: 'total', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    USER_DIVIDEND_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Number of tokens', dataIndex: 'total_tokens', align    },
        {   title:  'Total value', dataIndex: 'value', align    }, 
        {   title:  'Dividend per token', dataIndex: 'dividend_token', align    },
        {   title:  'Total amount', dataIndex: 'amount', align    },
    ]

}

export default columns