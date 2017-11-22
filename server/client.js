/*
* 此文件用于测试axios的接口获取数据
* */

var http  = require('http')
var axios = require('axios');
axios.get("http://www.imooc.com/index/getstarlist",{
    headers:{
      // Cookie: "imooc_uuid=5a350396-6331-4625-9b6d-b7aa5266c792; imooc_isnew_ct=1497444340; UM_distinctid=15cab55efa8175-03f46ae9630317-3e64430f-100200-15cab55efa95e9; loginstate=1; apsid=Q1ZGZkMDc5YjMwNzcyNzVmYWY0NTEyNTBlZmJkMDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTEyMTU5MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMzA1NDg3NjUyQHFxLmNvbQAAAAAAAAAAAAAAAAAAAGY5OGJhMmNjMGRlMzI0MzExNzM0YWI4NjI2ZjY4YzRi436tWeN%2BrVk%3DMD; last_login_username=1305487652%40qq.com; CNZZDATA1261110065=462927646-1497522089-null%7C1505397011; PHPSESSID=rm6j9238e9etfsbkcrm0039n30; imooc_isnew=2; cvde=59cb0c128a63a-8; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1505406412,1505909392,1505963861,1506479219; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1506479302"
      Cookie: "imooc_uuid=5a350396-6331-4625-9b6d-b7aa5266c792;"
    }
}).then((res)=>{
  console.log(res.data.data);
});
