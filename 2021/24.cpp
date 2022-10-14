#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
#include <unordered_map>
#include <unordered_set>
using namespace std;
typedef long long LL;
typedef pair<LL, LL> PLL;
const int N = 20, INF = 1e9;
unordered_map<char, int> dict{{'x', 0}, {'y', 1}, {'z', 2}, {'w', 3}};
unordered_map<LL, PLL> f[15]; // {step: {z_val: {code,  pre_z}}};
vector<vector<string> > monad(14);
LL ans;

void read_input()
{
  int n = -1;
  string s;
  while (getline(cin, s))
  {
    if (s[0] == 'i')
    {
      n++;
    }
    monad[n].push_back(s);
  }
}

bool run_monad(LL u, LL val, vector<LL> &state)
{
  char op[4], a[4], b[4];
  for (auto &c : monad[u])
  {
    int x = INF;
    if (c[0] == 'i')
      sscanf(c.c_str(), "%s %s", op, a);
    else
    {
      sscanf(c.c_str(), "%s %s %s", op, a, b);
      if (!dict.count(b[0]))
        x = stoi(string(b));
    }
    if (u == 13)
    {
      // cout << string(op) << ' ' << string(a) << ' ' << string(b) << endl;
    }
    if (c[0] == 'i')
    {
      state[dict[a[0]]] = val;
    }
    else
    {
      if (x == INF)
        x = state[dict[b[0]]];
      if (string(op) == "add")
      {
        state[dict[a[0]]] += x;
      }
      else if (string(op) == "mul")
      {
        state[dict[a[0]]] *= x;
      }
      else if (string(op) == "mod")
      {
        if (x == 0)
          return false;
        state[dict[a[0]]] %= x;
      }
      else if (string(op) == "div")
      {
        if (x == 0)
          return false;
        state[dict[a[0]]] /= x;
      }
      else if (string(op) == "eql")
      {
        state[dict[a[0]]] = (state[dict[a[0]]] == x);
      }
    }
  }
  return true;
}

int main()
{
  read_input();
  f[0][0] = {-1, -1};
  for (int i = 0; i < 14; i++)
  {
    for (auto &t : f[i])
    {
      cout << i << ' ' << f[i].size() << endl;
      auto pre_z = t.first;
      for (int j = 9; j >= 1; j--)
      {
        vector<LL> state(4, 0);
        state[dict['z']] = pre_z;
        run_monad(i, j, state);
        LL cur_z = state[dict['z']];
        if (!f[i + 1].count(cur_z))
        {
          f[i + 1][cur_z] = {j, pre_z};
        }
      }
    }
  }
  cout << "================" << endl;
  cout << f[14].size() << endl;
  cout << "================" << endl;
  for (int i = 13; i >= 1; i--)
  {
  }

  cout << ans << endl;
  return 0;
}
