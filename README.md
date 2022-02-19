## Short info

A continuation of a school project I did last fall.

Basically a blog app but instead of a blog you have a list and instead of posts that you post, you fetch movies from an external api and add them to your list. You can also then score the movies and add a comment if you want to. User access control is done with fauna.

Makes you think about how to render lists, so that atleast is somewhat interesting about it.

Data lives in faunadb and is fetched from there in `/pages/api`, all the fauna stuff is in `/fauna`.

The different pages are in `/pages`, with the main page being in `/pages/list`.

Made with responsive design in mind.
