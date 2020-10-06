using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Data.Dapper
{
    public class SqlBuilder
    {
        private readonly Dictionary<string, Clauses> _data = new Dictionary<string, Clauses>();
        private int _seq;

        private class Clause
        {
            public string Sql { get; set; }
            public object Parameters { get; set; }
            public bool IsInclusive { get; set; }
        }

        private class Clauses : List<Clause>
        {
            private readonly string _joiner, _prefix, _postfix;

            public Clauses(string joiner, string prefix = "", string postfix = "")
            {
                _joiner = joiner;
                _prefix = prefix;
                _postfix = postfix;
            }

            public string ResolveClauses(DynamicParameters p)
            {
                foreach (var item in this)
                {
                    p.AddDynamicParams(item.Parameters);
                }
                return this.Any(a => a.IsInclusive)
                    ? _prefix +
                      string.Join(_joiner,
                          this.Where(a => !a.IsInclusive)
                              .Select(c => c.Sql)
                              .Union(new[]
                              {
                                  " ( " +
                                  string.Join(" OR ", this.Where(a => a.IsInclusive).Select(c => c.Sql).ToArray()) +
                                  " ) "
                              }).ToArray()) + _postfix
                    : _prefix + string.Join(_joiner, this.Select(c => c.Sql).ToArray()) + _postfix;
            }
        }

        public class Template
        {
            private readonly string _sql;
            private readonly SqlBuilder _builder;
            private readonly object _initParams;
            private int _dataSeq = -1; // Unresolved

            public Template(SqlBuilder builder, string sql, dynamic parameters)
            {
                _initParams = parameters;
                _sql = sql;
                _builder = builder;
            }

            private static readonly Regex _regex = new Regex(@"\/\*\*.+?\*\*\/", RegexOptions.Compiled | RegexOptions.Multiline);

            private void ResolveSql()
            {
                if (_dataSeq != _builder._seq)
                {
                    var p = new DynamicParameters(_initParams);

                    rawSql = _sql;

                    foreach (var pair in _builder._data)
                    {
                        rawSql = rawSql.Replace("/**" + pair.Key + "**/", pair.Value.ResolveClauses(p));
                    }
                    parameters = p;

                    // replace all that is left with empty
                    rawSql = _regex.Replace(rawSql, "");

                    _dataSeq = _builder._seq;
                }
            }

            private string rawSql;
            private object parameters;

            public string RawSql
            {
                get { ResolveSql(); return rawSql; }
            }

            public object Parameters
            {
                get { ResolveSql(); return parameters; }
            }
        }

        public Template AddTemplate(string sql, dynamic parameters = null)
        {
            return new Template(this, sql, parameters);
        }

        protected SqlBuilder AddClause(string name, string sql, object parameters, string joiner, string prefix = "", string postfix = "", bool isInclusive = false)
        {
            Clauses clauses = null;
            if (!_data.TryGetValue(name, out clauses))
            {
                clauses = new Clauses(joiner, prefix, postfix);
                _data[name] = clauses;
            }
            clauses.Add(new Clause { Sql = sql, Parameters = parameters, IsInclusive = isInclusive });
            _seq++;
            return this;
        }

        public SqlBuilder Intersect(string sql, dynamic parameters = null)
        {
            return AddClause("intersect", sql, parameters, " INTERSECT  ", "  ", " ", false);
        }

        public SqlBuilder InnerJoin(string sql, dynamic parameters = null)
        {
            return AddClause("innerjoin", sql, parameters, " INNER JOIN ", " INNER JOIN ", " ", false);
        }

        public SqlBuilder LeftJoin(string sql, dynamic parameters = null)
        {
            return AddClause("leftjoin", sql, parameters, " LEFT JOIN ", " LEFT JOIN ", " ", false);
        }

        public SqlBuilder RightJoin(string sql, dynamic parameters = null)
        {
            return AddClause("rightjoin", sql, parameters, " RIGHT JOIN ", " RIGHT JOIN ", " ", false);
        }

        public SqlBuilder Where(string sql, dynamic parameters = null)
        {
            return AddClause("where", sql, parameters, " AND ", "WHERE ", " ", false);
        }

        public SqlBuilder OrWhere(string sql, dynamic parameters = null)
        {
            return AddClause("where", sql, parameters, " OR ", "WHERE ", " ", true);
        }

        public SqlBuilder OrderBy(string sql, dynamic parameters = null)
        {
            return AddClause("orderby", sql, parameters, " , ", "ORDER BY ", " ", false);
        }

        public SqlBuilder Select(string sql, dynamic parameters = null)
        {
            return AddClause("select", sql, parameters, " , ", "", " ", false);
        }

        public SqlBuilder AddParameters(dynamic parameters)
        {
            return AddClause("--parameters", "", parameters, "", "", "", false);
        }

        public SqlBuilder Join(string sql, dynamic parameters = null)
        {
            return AddClause("join", sql, parameters, " JOIN ", " JOIN ", " ", false);
        }

        public SqlBuilder GroupBy(string sql, dynamic parameters = null)
        {
            return AddClause("groupby", sql, parameters, " , ", " GROUP BY ", " ", false);
        }

        public SqlBuilder Having(string sql, dynamic parameters = null)
        {
            return AddClause("having", sql, parameters, " AND ", "HAVING ", " ", false);
        }
    }
}