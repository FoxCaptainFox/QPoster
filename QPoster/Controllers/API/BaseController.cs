using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace QPoster.Controllers.API
{
    [Route("api/[controller]")]
    public class _BaseApiController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        protected IActionResult Content(int statusCode, object content, string contentType = "json")
        {
            return new ContentResult
            {
                StatusCode = statusCode,
                ContentType = contentType,
                Content = JsonConvert.SerializeObject(content)
            };
        }
    }
}