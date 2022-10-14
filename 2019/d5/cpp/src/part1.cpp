#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <set>

using namespace std;

int main(int argc, char **argv)
{
  if (argc < 1)
  {
    cerr << "Input file expected\n";
    return 1;
  }
  ifstream infile(argv[1]);

  if (!infile.good())
  {
    cerr << "Input file " << argv[1] << " does not exist\n";
    return 1;
  }

  vector<int> data;
  string line;
  while (getline(infile, line))
  {

    stringstream ssl(line);
    int value;
    ssl >> value;
    data.push_back(value);
  }

  for (int i = 0; i < data.size(); i++)
  {
    cout << data[i] << endl;
  }

  return 0;
}
