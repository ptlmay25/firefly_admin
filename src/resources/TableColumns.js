const align = 'center'

const columns = {
    PURCHASE_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Purchase ID', dataIndex: 'pur_id', align     },
        {   title:  'User Account Number', dataIndex: 'user_acc_num', align    }, 
        {   title:  'Number of Tokens', dataIndex: 'num_of_tokens', align    },
        {   title:  'Token Price', dataIndex: 'token_price', align    },
        {   title:  'Total', dataIndex: 'total_price', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    SELLING_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Selling ID', dataIndex: 'sell_id', align     },
        {   title:  'User Account Number', dataIndex: 'user_acc_num', align    }, 
        {   title:  'Number of Tokens', dataIndex: 'num_of_tokens', align    },
        {   title:  'Token Price', dataIndex: 'token_price', align    },
        {   title:  'Total', dataIndex: 'total_price', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    WITHDRAWAL_HISTORY: [
        {   title:  'Request Number', dataIndex: 'request_number', align     },
        {   title:  'Date', dataIndex: 'createdAt', align    },
        {   title:  'Name', dataIndex: 'name', align    }, 
        {   title:  'UPI', dataIndex: 'UPI', align    },
        {   title:  'Bank Account Number', dataIndex: 'BankAccountNumber', align    },
        {   title:  'IFSC Code', dataIndex: 'IFSC', align    },
        {   title:  'Total Amount', dataIndex: 'total_amount', align    },
    ],
    CONTACT_HISTORY: [
        {   title:  'Request Number', dataIndex: '_id', align     },
        {   title:  'Date', dataIndex: 'createdAt', align    },
        {   title:  'Full Name', dataIndex: 'name', align    }, 
        {   title:  'Account Number', dataIndex: 'BankAccountNumber', align    },
        {   title:  'Message', dataIndex: 'message', align    },
    ],
    TOKEN_PRICE_HISTORY: [
        {   title:  'Month + Year', dataIndex: 'month', align     },
        {   title:  'Upload Date', dataIndex: 'upload_date', align    },
        {   title:  'Total Revenue', dataIndex: 'total_revenue', align    }, 
        {   title:  'Operating Expenses', dataIndex: 'operating_expenses', align    },
        {   title:  'Interest and tax', dataIndex: 'interest_and_taxes', align    },
        {   title:  'Net Profit', dataIndex: 'net_profit', align    },
        {   title:  '50/50 split', dataIndex: 'split_50_50', align    },
        {   title:  'Total Tokens', dataIndex: 'total_number_of_tokens', align    },
        {   title:  'Dividend per token', dataIndex: 'dividend_per_token', align    },
        {   title:  'Token Price', dataIndex: 'token_price', align    },
    ],
    WITHDRAWAL_REQUEST: [
        {   title:  'Date', dataIndex: 'createdAt', align    },
        {   title:  'User ID', dataIndex: 'userId', align     },
        {   title:  'Withdraw ID', dataIndex: 'withdraw_id', align    },
        {   title:  'Account Holder Name', dataIndex: 'acc_holder_name', align    },
        {   title:  'Bank Account Number', dataIndex: 'BankAccountNumber', align    },
        {   title:  'User Account Balance', dataIndex: 'acc_bal', align    },
        {   title:  'IFSC Code', dataIndex: 'IFSC', align    },
        {   title:  'Total Withdrawal Amount', dataIndex: 'total_amount', align    },
    ],
    CONTACT_REQUEST: [
        {   title:  'Date', dataIndex: 'createdAt', align    },
        {   title:  'Account Number', dataIndex: 'BankAccountNumber', align    },
        {   title:  'Full Name', dataIndex: 'name', align    }, 
        {   title:  'Email Address', dataIndex: 'email', align    },
        {   title:  'Message', dataIndex: 'message', align    },
    ],
    USER_LIST: [
        {   title:  'User ID', dataIndex: '_id', align     },
        {   title:  'Join Date', dataIndex: 'createdAt', align    },
        {   title:  'Full Name', dataIndex: 'name', align    },
        {   title:  'Phone Number', dataIndex: 'mobileNo', align    },
        {   title:  'Gender', dataIndex: 'gender', align    },
        {   title:  'Total Token Purchase', dataIndex: 'tokens', align    },
        {   title:  'Total Dividend Earned', dataIndex: 'total_dividend', align    },
        {   title:  'Account Balance', dataIndex: 'acc_bal', align    },
    ],
    PARTNER_LIST: [
        {   title:  'Retail ID', dataIndex: 'retailId', align     },
        {   title:  'Join Date', dataIndex: 'date', align    },
        {   title:  'Store Name', dataIndex: 'storeName', align    },
        {   title:  'Phone Number', dataIndex: 'mobileNo', align    },
        {   title:  'City', dataIndex: 'city', align    },
        {   title:  'State', dataIndex: 'state', align    },
    ],
    USER_WITHDRAWAL_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Bank Account Number', dataIndex: 'BankAccountNumber', align    },
        {   title:  'UPI', dataIndex: 'UPI', align    },
        {   title:  'IFSC Code', dataIndex: 'IFSC', align    },
        {   title:  'Total Amount', dataIndex: 'total_amount', align    },
        {   title:  'Status', dataIndex: 'Status', align    },
    ],
    USER_PURCHASE_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Purchase ID', dataIndex: 'purchaseId', align     },
        {   title:  'Number of Tokens', dataIndex: 'num_of_tokens', align    },
        {   title:  'Purchase Price', dataIndex: 'token_price', align    },
        {   title:  'Total Amount', dataIndex: 'total_amount', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
    USER_SELLING_HISTORY: [
        {   title:  'Date', dataIndex: 'date', align    },
        {   title:  'Selling ID', dataIndex: 'sellingId', align     },
        {   title:  'Number of Tokens', dataIndex: 'num_of_tokens', align    },
        {   title:  'Sell Price', dataIndex: 'token_price', align    },
        {   title:  'Total Amount', dataIndex: 'total_amount', align    },
        {   title:  'Status', dataIndex: 'status', align    },
    ],
}

export default columns