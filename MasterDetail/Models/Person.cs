using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterDetail.Models
{
    public class Person
    {
        public int PersonId { set; get; }

        public string Name { set; get; }

        public string LastName { set; get; }

        public List<PersonInfo> PersonInfo { set; get; } = new List<Models.PersonInfo>();
    }

    public class PersonInfo
    {
        public int PersonInfoId { set; get; }

        public int PersonId { set; get; }

        public Person Person { set; get; }

        public int Level { set; get; }

        public string SchoolName { set; get; }

        public int Year { set; get; }
    }
}
