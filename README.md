# flatmark

A lightweight, super-simple, flatfile-based bookmark app

## Format specification

The core of **flatmark** is a plaintext file containing all bookmarks. The format
is inspired by successful and simple formats like todo.txt — there are only
three rules:

- a bookmark is one line in the file, beginning with the link itself
- after the link follows a whitespace and an optional description in brackets
- after the description there are tags indicated by the hash-sign

A simple example would look like this:

    https://www.github.com (Optional description) #some #optional #tags

## License

MIT License

Copyright (c) 2016 philcoffeejunkie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
