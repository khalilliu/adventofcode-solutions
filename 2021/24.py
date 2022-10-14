blocks = [block.split('\n') for block in open(
    '24.input').read().split('inp w\n')[1:]]
model_max = [0] * 14
model_min = [0] * 14
stack = []
for i, block in enumerate(blocks):
    if block[3] == 'div z 1':
        stack.append((i, int(block[14].split(' ')[-1])))  # add y <val>
    elif block[3] == 'div z 26':
        j, x = stack.pop()
        diff = x + int(block[4].split(' ')[-1])  # add x <-val>
        if diff < 0:
            i, j, diff = j, i, -diff
        model_max[i] = 9
        model_max[j] = 9 - diff
        model_min[i] = 1 + diff
        model_min[j] = 1
print(''.join(map(str, model_max)))
print(''.join(map(str, model_min)))
