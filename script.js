    const form = document.getElementById('recipeForm');
    const recipeList = document.getElementById('recipeList');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorMsg.textContent = '';

      const username = document.getElementById('username').value.trim();
      const title = document.getElementById('title').value.trim();
      const ingredients = document.getElementById('ingredients').value.trim();
      const instructions = document.getElementById('instructions').value.trim();
      const category = document.getElementById('category').value;
      const imageUpload = document.getElementById('imageUpload').files[0];

      if (!username || !title || !ingredients || !instructions || !category) {
        errorMsg.textContent = 'Please fill out all fields.';
        return;
      }

      const card = document.createElement('div');
      card.className = 'recipe-card';
      
      const reader = new FileReader();
      reader.onload = function () {
        card.innerHTML = `
          <h3>${title} <small>(${category})</small></h3>
          <p><strong>By:</strong> ${username}</p>
          <p><strong>Ingredients:</strong> ${ingredients}</p>
          <p><strong>Instructions:</strong> ${instructions}</p>
          ${imageUpload ? `<img src="${reader.result}" alt="Recipe Image" class="recipe-image" />` : ''}
        `;
        recipeList.prepend(card);
      };

      if (imageUpload) {
        reader.readAsDataURL(imageUpload);
      } else {
        card.innerHTML = `
          <h3>${title} <small>(${category})</small></h3>
          <p><strong>By:</strong> ${username}</p>
          <p><strong>Ingredients:</strong> ${ingredients}</p>
          <p><strong>Instructions:</strong> ${instructions}</p>
        `;
        recipeList.prepend(card);
      }

      form.reset();
    });