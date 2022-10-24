#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
  int T; cin >> T;
  while(T--) {
    int n;
    string s1;
    cin >> n >> s1;
    for(int i=0; i<n; i++) {
      int j=i+1; 
      while(j < n && s1[j] == s1[i]) {
        j++;
      }
      s2 += s1[i];
      i = j-1;
    }
    n = s2.size();
    int i = s[0] == '0';
    int t = ((n - i) / 2 * 2 - 1);
    t += (t & 1) && ((n-i)&1);
    cout << max(t, 0) << endl;
  }
  return 0;
}
