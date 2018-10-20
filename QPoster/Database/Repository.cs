using Microsoft.EntityFrameworkCore;
using QPoster.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QPoster.Database
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DataContext _db;

        private DbSet<T> _dbSet;

        public Repository(DataContext context)
        {
            _db = context;
            _dbSet = _db.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            try
            {
                return _dbSet;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<T> Find(Func<T, bool> predicate)
        {
            try
            {
                return _dbSet.Where(predicate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Remove(Func<T, bool> predicate)
        {
            try
            {
                _dbSet.Remove(_dbSet.Single(predicate));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Insert(T item)
        {
            try
            {
                _dbSet.Add(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(T item)
        {
            try
            {
                _db.Entry(item).State = EntityState.Modified;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public T First(Func<T, bool> predicate)
        {
            try
            {
                return _dbSet.First(predicate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Dispose() { }

        public void SaveChanges()
        {
            try
            {
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
