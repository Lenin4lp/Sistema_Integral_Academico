const jsonResponse = function (statuscode:number, body:any) {
    return {
      statuscode,
      body: body,
    };
  };

  export default jsonResponse;