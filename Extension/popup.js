document.getElementById('saveButton').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    chrome.storage.local.set({ savedText: text }, function() {
        console.log('Texte enregistré :', text);
        // alert('Texte enregistré avec succès !');
    });
});
