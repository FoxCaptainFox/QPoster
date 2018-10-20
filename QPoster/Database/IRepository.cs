using System;
using System.Collections.Generic;

namespace QPoster.Database
{
    public interface IRepository<T> : IDisposable
           where T : class
    {
        IEnumerable<T> GetAll();

        T First(Func<T, bool> predicate);

        IEnumerable<T> Find(Func<T, bool> predicate);

        void Remove(Func<T, bool> predicate);

        void Insert(T item);

        void Update(T item);

        void SaveChanges();
    }
}
