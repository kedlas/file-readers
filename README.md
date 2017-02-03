# file-readers

Project to test if is faster to read files in PHP v7.1 or NodeJs v6.7.

Tests:
1. Reading file
2. Piping file to output
3. Modifying file

Modification of file consist of:
1. Concatenating of first_name and last_name fields into full_name
2. Tranforming of gender "Female" and "Male" values into "F" and "M"
3. Deleting IP address
4. Changing separator from "," to ";"

Look in run.sh to view the test scenarios.

To run container use commands:
- docker build -t file-read-test .
- docker run -it --rm --name my-file-read-test file-read-test