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
        public List<Task> GetTasks()
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

        [HttpGet("[action]")]
        public IActionResult TaskList()
        {
            return View();
        }

        [HttpPost("[action]")]
        public bool Delete([FromBody]DeleteItem item)
        {
            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string sqlcmd = "DELETE FROM TaskList WHERE Id=" + item.Id;
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = sqlcmd;

            comm.ExecuteReader();
            return true;
        }

        //[FromBody] tag connects this action with Angular2
        [HttpPost("[action]")]
        public bool Create([FromBody]NewTask task)
        {
            // get all data from post request 
            string name = task.Name;
            string description = task.Description;
            string priority = task.Priority;
            string completed = "N";


            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string str = "select count(*) from TaskList";
            SqlCommand com = new SqlCommand(str, conn);
            int count = Convert.ToInt16(com.ExecuteScalar()) + 1;

            string sqlcmd = "INSERT INTO dbo.TaskList (Id, Name, Description, Priority, Completed) VALUES ("+count+", '" + name + "', '" + description + "', '" + priority + "', '" + completed + "')";
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = sqlcmd;

            Debug.Write(sqlcmd);

            comm.ExecuteReader();

            return true;
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

        // Model for Tasks being created from Add Task Form
        public class NewTask
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Priority { get; set; }
        }

        // Model for tasks that ned to be deleted
        public class DeleteItem
        {
            public string Id { get; set; }
        }
    }
}