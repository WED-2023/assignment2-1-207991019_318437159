<template>
  <div class="about-page">
    <div class="overlay">
      <div class="container-xxl">
        <div class="content">
          <h1 class="display-4 text-center mb-4">About Us</h1>
          <p class="lead text-center mb-5">
            Welcome to "Grandma's Recipes", where tradition meets innovation.
          </p>
          <div class="row justify-content-center">
            <div class="col-lg-6 mb-4">
              <h3 class="text-primary mb-4">Meet the Team</h3>
              <p>
                We are <strong>Tom Sheinman</strong> and
                <strong>Ron Ohayon</strong>, third-year students at Ben-Gurion
                University in Be'er Sheva, Israel, both 27 years old. As
                students of Software Information Systems, we combine our
                technical expertise with our love for food to bring you this
                unique project.
              </p>
              <p>
                Our shared passion for food has been a driving force behind
                "Grandma's Recipes". We have always been intrigued by the
                culinary traditions passed down through our families and aim to
                preserve and share these treasured recipes with the world.
              </p>
              <p>
                We believe that food has the power to bring people together,
                creating a sense of community and belonging. Our goal is to make
                these traditional recipes accessible to everyone, ensuring that
                they are not forgotten but instead cherished and enjoyed by
                future generations.
              </p>
            </div>
            <div class="col-lg-6 mb-4">
              <h3 class="text-primary mb-4">Our Project</h3>
              <p>
                "Grandma's Recipes" is more than just a recipe website. It is a
                celebration of culinary heritage and innovation. Our platform
                features a wide range of recipes, from traditional family dishes
                to modern favorites, all meticulously curated and presented with
                step-by-step instructions.
              </p>
              <p>
                Each recipe is accompanied by personal stories and tips, making
                your cooking experience both enjoyable and meaningful. Whether
                you are a novice cook or an experienced chef, our collection has
                something for everyone.
              </p>
              <p>
                We are committed to continuous improvement and regularly update
                our collection with new recipes and techniques. We encourage our
                users to share their own family recipes and cooking experiences,
                creating a dynamic and interactive community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about-page {
  background-image: url("../assets/AboutUsBackground.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
  color: #fff;
  font-size: 1.4rem;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  border-radius: 10px;
  padding: 2rem;
}

.display-4 {
  font-size: 3.5rem;
  color: #007bff;
}

.lead {
  font-size: 2.3rem;
  font-weight: 400;
  color: #6c757d;
}

.text-primary {
  text-align: center;
  font-size: 2.5rem;
  color: #007bff;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>