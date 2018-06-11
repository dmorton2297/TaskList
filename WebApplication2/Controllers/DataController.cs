using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        [HttpGet("[action]")]
        public List<Task> Tasks()
        {

             SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
             SqlCommand comm = conn.CreateCommand();
             comm.CommandText = "Select * from TaskList";
             conn.Open();

             SqlDataReader reader = comm.ExecuteReader();
             List<Task> results = new List<Task>();
             if (reader.HasRows)
             {
                 while (reader.Read())
                 {
                     Task entry = new Task
                     {
                         Id = reader.GetInt32(0),
                         Name = reader.GetString(1),
                         Description = reader.GetString(2),
                         Priority = reader.GetString(3),
                         Completed = reader.GetString(4)
                     };
                     results.Add(entry);
                     Debug.Write("Entry retrieved, ID = " + entry.Id + "\n\n");
                 }
             }


            return results;

        }

        [Serializable]
        public class Task
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Priority { get; set; }
            public string Completed { get; set; }
        }

      
    }
}