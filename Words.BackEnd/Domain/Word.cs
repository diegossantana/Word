using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain {
    public class Word {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WordId { get; set; }

        [Required]
        [StringLength(44)]
        [RegularExpression(@"^[a-zA-ZÀ-ú]+$")]
        public string Name { get; set; }
        public int Size { get; set; }

        public Word(string name) {
            Name = name;
            Size = name.Length;
        }
    }
}
