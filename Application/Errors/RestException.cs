using System.Net;
using System;
namespace Application.Errors
{
   public class RestException : Exception
   {
      public object Errors { get; set; }
      public HttpStatusCode Code { get; set; }
      public RestException(HttpStatusCode code, object error = null)
      {
         this.Code = code;
         this.Errors = error;
      }
   }
}