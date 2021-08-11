using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Coin.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoinGeckoController : ControllerBase
    {
        private readonly ILogger<CoinGeckoController> _logger;

        public CoinGeckoController(ILogger<CoinGeckoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return Enumerable.Empty<string>();
        }

        [HttpGet]
        [Route("market")]
        public async Task<IActionResult> getMarket()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
            var httpClient = new HttpClient();
            var getTask = await httpClient.SendAsync(request);
            return new JsonResult(getTask.Content.ReadAsStringAsync());
        }
    }
}
