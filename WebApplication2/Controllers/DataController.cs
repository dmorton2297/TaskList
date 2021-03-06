﻿using System;
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
                        Completed = reader.GetString(4),
                        Category = reader.GetInt32(5)
                     };
                     results.Add(entry);
                     Debug.Write("Entry retrieved, ID = " + entry.Id + "\n\n");
                 }
             }


            return results;

        }

        [HttpGet("[action]")]
        public List<Category> GetCategories()
        {
            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "Select * from Categories";
            conn.Open();

            SqlDataReader reader = comm.ExecuteReader();
            List<Category> results = new List<Category>();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Category entry = new Category
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1)
                    };
                    results.Add(entry);
                }
            }


            return results;
        }

        [HttpGet("[action]/{id}")]
        public Task GetTask(int id)
        {
            Task entry;
            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string sqlcmd = "SELECT * FROM TaskList WHERE Id=" + id;
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = sqlcmd;

            Debug.Write(sqlcmd);

            SqlDataReader reader = comm.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    entry = new Task
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Description = reader.GetString(2),
                        Priority = reader.GetString(3),
                        Completed = reader.GetString(4),
                        Category = reader.GetInt32(5)
                    };

                    return entry;

                }
            }

            Debug.Write("We could not find the entry we were looking for\n");
            return new Task();
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

        [HttpPost("[action]")]
        public bool Update([FromBody]Task item)
        {
            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string sqlcmd = "UPDATE TaskList SET name='"+item.Name+"', description='"+item.Description+"', priority='"+item.Priority+"', category="+item.Category+" WHERE Id="+ item.Id;
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
            string category = task.Category;


            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string str = "select MAX(Id) from TaskList";
            SqlCommand com = new SqlCommand(str, conn);
            int count = 0;
            try
            {
                count = Convert.ToInt16(com.ExecuteScalar()) + 1;

            }catch(Exception e)
            {
                Debug.Write("Database is empty");
            }

            string sqlcmd = "INSERT INTO dbo.TaskList (Id, Name, Description, Priority, Completed, Category) VALUES ("+count+", '" + name + "', '" + description + "', '" + priority + "', '" + completed + "', "+category+")";
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = sqlcmd;

            Debug.Write(sqlcmd);

            comm.ExecuteReader();

            return true;
        }

        [HttpPost("[action]")]
        public bool MarkStatus([FromBody]StatusItem item)
        {
            SqlConnection conn = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Tasks;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            conn.Open();

            string sqlcmd = "update TaskList SET Completed='"+item.Status+"' WHERE Id=" + item.Id;
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
            public int Category { get; set; }
        }

        // Model for Tasks being created from Add Task Form
        public class NewTask
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Priority { get; set; }
            public string Category { get; set; }
        }

        public class StatusItem
        {
            public string Id { get; set; }
            public string Status { get; set; }
        }

        // Model for tasks that ned to be deleted
        public class DeleteItem
        {
            public string Id { get; set; }
        }

        public class Category
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}