# Candidates
Test repo to play around with nest.js and angular and showcase coding skills.

### Running the app

``` bash
# from root folder
npm run inst-all
npm start
```

Then go to http://localhost:4200/ for the frontend app

And http://localhost:3000/api for the backend's swagger

### Disclaimer

This exercise has been constructed in a limited time frame, specifically according to a certain code challenge and its requirements, without paying too much attention to matters I'd normally care about in real projects. For example, I've not minded about SSL/TLS, since this is not going to be run anywhere else than in localhost; I have not done an extensive due diligence for the versions and dependencies I'm using here. Some of them are too brand new and may present warnings that are not yet possible to be fixed. In real world I'd fallback to known LTS versions, but for this learning exercise, all is fine 🔥🐕🔥.
Please excuse and disregard all that ugliness.

### Usage

![myimage](docs/candidatesMain.png?raw=true)

- Add candidates to the list by using the left side form
- Delete candidates from the list with the bin buttons in the elements of the list of candidates
- Export the current candidates to a file using the export button in the right upper corner.
- Import the candidates in an exported file using the import button at the left upper corner of the candidates list.

### Pending

- Proper test setup and coverage for the frontend. I might be spending a little bit more time in that for a while, but depending on the following steps for this challenge proposal I might leave it as it is, given that my testing skills are probably already shown with the backend.
