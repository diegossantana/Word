dotnet ef migrations add SegundaMigration --startup-project Words.BackEnd --project Infrastructure
dotnet ef database update --startup-project Words.BackEnd --project Infrastructure