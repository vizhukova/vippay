import string
import random
import unittest


class Helpers(object):

    def inorder(self, n):
        seq = [x for x in range(n)]
        return random.choice(seq)

    def random_string(self, n):
        test = string.ascii_lowercase
        result = ''
        for i in range(n):
            index = random.randint(0, len(test) - 1)
            char = test[index]
            result += char
        return result


if __name__ == '__main__':
    unittest.main()
