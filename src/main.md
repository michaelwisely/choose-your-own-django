---
revealjs-url: "http://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.0.0"
theme: "serif"
transition: "fade"

style: "
    .reveal section img { border:none; box-shadow:none;}
"

extra-script: "
    Reveal.configure({controls: false});
"
...

![](https://www.djangoproject.com/s/img/logos/django-logo-negative.svg)

The web framework for perfectionists with deadlines

# Shameless Promoting

## ACM SIG-Game

![We Make MegaMinerAI](http://i.imgur.com/q1G16Tz.png)

We also use Django for a bunch of different things.

* Our big ol' web application: MegaMinerAI.com
* Our big ol' arena
* Our regular sized voting application

## MegaMinerAI 15

Mark your calendars!

* April 18th - 19th, 2015
* Competition begins at Noon on Saturday, and ends at Noon on Sunday
* Compete for fabulous prizes
    * First place: $500
    * Second place: $220
    * Third place: $120
* Write code, eat food, have fun, get a shirt

# Our Story Begins

-----

*Like any good* **Choose Your Own Adventure***, we need a premise for
this experience that we're about to undergo.*

# Dungeons and Djragons

-----

You are Mango-Dave. Adventurer extraordinaire. Dungeon master. And you
are on your ultimate quest in the Django Dungeon. What is it you hope
to find here, Mango-Dave? Glory? Riches? A powerful web framework
tailored for busy professionals? Only time will tell. Your options are
many, Mango-Dave; the dungeon labyrinthine; the slide show baffling
and spooky; and not all doors are to be opened...

-----

![](http://i.imgur.com/jE9r1Ar.png)


# The Dungeon or Whatever

-----

Ah geez. You're in the dungeon or whatever. There are so many
doors... Which one are you going to try now?

* [Authentication](#authentication)
* [Deploying](#deploying)
* [Django Apps](#django-apps)
* [Forms](#forms)
* [Interactive Frontends](#interactive-frontends)
* [Models](#models)
* [Other Batteries](#other-batteries)
* [RESTful APIs](#restful-apis)
* [Security](#security)
* [Templates](#templates)
* [Views](#views)
* [Web Development Basics](#web-development-basics)

## A Key

You found a key.

Use the key?

[Yes](#use-the-key) or [No](#no)

# Web Development Basics

## How Do Websites Work?

-----

### Message Passing

Pulling up a website involves sending and receiving a number of
messages through a network. When you load `MegaMinerAI.com`, your
browser has to do several things:

-----

### Getting a Web Page

Let's say we're trying to get `MegaMinerAI.com/about/`

1. Figure out which computer on the Internet is named
   `MegaMinerAI.com` and get their IP
2. Contact the machine for `MegaMinerAI.com` and ask for the page at `/about/`
3. `MegaMinerAI.com` prepares your page for you, and sends it back to your browser
4. Your browser can then render `MegaMinerAI.com`'s response as a web page

-----

### Requests & Responses

Clients (browser, etc.) send **requests** to servers.

Servers send **responses** back.

Requests and responses follow the hypertext transfer protocol, or HTTP.

-----

### Request

Clients send request for information by including bits about what they
need. This may include the path (`/about`) that they're trying to get
to, user session information, etc.

There are a variety of different requests methods that clients can use

* **GET** A read operation
* **POST** A write (create) operation
* **PUT** A write (update) operation
* **DELETE** A write (delete) operation

-----

### Request

It's up to the server how to interpret the use of these
messages. However, a method can give the server a pretty good idea of
what the user is trying to do.

Developers should write their servers check for proper use of request
methods for consistency and for their own sanity.

Often times, servers will reject/ignore HTTP methods that are
unauthorized or nonsense. (i.e., deleting a Twitter post that you did
not make).

-----

### Responses

A server responds to a client's request by returning a big ol' wad of
data and meta-data about that data.

Each response has a response code, which falls into one of several categories:

* `2XX` **Success**: Good job.
* `4xx` **Client Error**: Your client (browser, etc.) sent a message that
  didn't make any sense to the server
* `5XX` **Server Error**: Something is broken on the server. It's not
  your fault. Unless you're the server developer. Then it's your
  fault.

-----

![](https://www.djangoproject.com/s/img/logos/django-logo-negative.svg)

Django is a **web framework**.

**You** write code to tell Django how to respond to incoming requests.

## How?

Django follows a Model, View, Controller design pattern.

* **Models** : Define how data is represented in your database
* **Templates** : Write template HTML code to specify how pages should
  look
* **Views** : Tell Django how to fill in the templates with the data
  from your models.

## That's it!

It takes some time to get used to, but once you're familiar with the
framework, you'll be churning out fancy web applications in no time.


## Spooky IP Packet

-----

The headers! So many headers! What are the for even!?

You cover your head and hop away. Fortunately, the packet was routed
through a lower latency, though spookier, dungeon.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# Models

## The ORM

Django comes with an **Object Relational Mapper** which handles a lot
of boring database stuff for you.

Including writing SQL.

You do not have to write SQL.

You should not write SQL.

Let Django write SQL.

## Why ORM?

Because it is database agnostic. Different relational DBMSs speak
variations of SQL. Django knows those variations and can easily switch
from DBMS to DBMS.

Why is that cool?

You can use something super light-weight (SQLite) for development, and
switch to something beefier when you're ready for deployment
(PostgreSQL) without having to change your code.

## More ORM

You define Python classes, and let Django figure out how to translate
them into database tables.

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

Gets automatically turned into this:

```sql
CREATE TABLE myapp_person (
    "id" serial NOT NULL PRIMARY KEY,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(30) NOT NULL
);
```

## More more ORM

And it's not just for creating databases.

Use Python objects to query the database. It's easier to read when you
get into long, complicated queries that involve complex relationships.

```python
# all da people
all_people = Person.objects.all()

# all da mango people
mango_people = Person.objects.filter(last_name="Mango")
```

```sql
SELECT * FROM my_db.person_table;

SELECT * FROM my_db.person_table where ...
```

## Perfection

Nope.

Ease of development is traded off for some performance. However, in
many cases, Django's SQL statements are about as optimal as you can
get.

If you need to write raw SQL, Django's ORM allows for that.

But SQL is still yucky.

## The Glorious PostgreSQL-ephant

-----

Despite its radiant glory, the PostgreSQL-ephant does not make a big
deal about it. In fact, it is making such little deal, that it is, in
a way, making the biggest deal about it.

You are consumed by its glory, but only so much as to buy one of the
T-shirts that it is
selling. [Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

![](http://img2.wikia.nocookie.net/__cb20120707083107/adventuretimewithfinnandjake/images/b/b5/Ancient_Psychic_Tandem_War_Elephant.png)


# Views

## Views are Glue

A `view` is where you implement your logic for building a web page in
response to a request.

Given all the contextual information from the request, it's the
`view`'s job to return a big wad of HTML for the client.

## View Functions

Let's return a *very* simple page

```python
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
```

-----

Now for a more complex page that uses a template

```python
from django.http import Http404
from django.shortcuts import render_to_response
from polls.models import Poll

# We get poll_id from the url.
# For example: with a URL pattern of '^/polls/(\d+)/'
# A visit to `website.com/polls/3/ would set poll_id to 3
def detail(request, poll_id):
    try:
        p = Poll.objects.get(pk=poll_id)
    except Poll.DoesNotExist:
        raise Http404("Poll does not exist")
    return render_to_response('polls/detail.html', {'poll': p})
```

## Class Based Views

A lot of pages use the same functionality over and over and over, (ad nauseam).

* Listing objects from the database
* Looking at details of an object
* Editing an object
* Creating an object
* Deleting an object

Django comes with generic, class-based views that do many of those
things for us.

## Using CBVs

We can create a page that lists all instances of a `Person` model

```python
# views.py
from django.views.generic import ListView
from .models import Person

class PersonList(ListView):
    model = Person
```

## Using CBVs

We can even override some default behaviors to make it fancy, but
still super-duper short.

```python
# views.py
from django.views.generic import ListView
from .models import Person

class MangoList(ListView):
    template_name = "my_templates/list_mangos.html"
    paginate_by = 10

    def get_queryset(self):
        return Person.objects.filter(last_name="Mango")
```


## The Villain from Tron

-----

What is that? An upside down silo? OH NO! It’s that red guy from Tron!
Look at those creepy eyeballs!  You hop on your light bike or whatever
and [scoot on outta here](#the-dungeon-or-whatever).

![I'm trusting you to not look up my nose. -*Tron Guy* ](http://vignette2.wikia.nocookie.net/tron/images/1/10/Mcp.PNG/revision/latest?cb=20071224235914)


# Templates

## Missing Pieces

Templates are web pages that are missing pieces.

Period.

## Missing Pieces

When Django renders a template, it fills in the missing pieces
according to a context dictionary (dictionary of variables) that you
pass it.

You create the "holes" using Django's template language

-----

For example:

```djangotemplate
<html>
  <body>
    <h1>Hello. My name is {{ name }}.</h1>
  </body>
</html>
```

Given that the template renderer is passed a context `{'name': 'Mango
Dave'}`, this template will render as:

```html
<html>
  <body>
    <h1>Hello. My name is Mango Dave.</h1>
  </body>
</html>
```

## Tags and Filters

Django's template language allows you to do cool things within templates

Filters allow you to modify variables before they are added to the
rendered page. For example, `|upper` will make a string uppercase.

```djangotemplate
{{ story.headline|upper }}
```

Tags allow you to do spookier logic stuff. For loops, for instance.

```djangotemplate
{% for object in object_list %}
  <li>{{ object.name }}</li>
{% endfor %}
```

## Inheritance

You can also extend templates through inheritance. It is a good idea
to reduce repetition by moving bits of HTML to a higher template when
possible. As a trivial example...

-----

Given these templates....

```djangotemplate
{# base.html #}
<html>
  <head>
    <!--- So many links and scripts and metas ...-->
  </head>
  <body>
    <h1> Every page has the same title for some reason! </h1>
    {% block content%} {% endblock %}
  </body>
</html>
```

```djangotemplate
{# mango_list.html #}

{% extends "base.html" %}

{% block content%}
  <ul>
    {% for weapon in mango_weapons %}
      <li> {{ weapon|upper }} </li>
    {% endfor %}
  </ul>
{% endblock %}
```

-----

... and this context...

```python
context = {
  'mango_weapons': ['knife', 'gun', 'two guns']
}
```

-----

... results in this page.

```html
<html>
  <head>
    <!--- So many links and scripts and metas ...-->
  </head>
  <body>
    <h1> Every page has the same title for some reason! </h1>
    <ul>
      <li>KNIFE</li>
      <li>GUN</li>
      <li>TWO GUNS</li>
    </ul>
  </body>
</html>
```

## The Terrible Trivium

-----

You hear a quiet voice coming from a dark corner of the room. "I
wonder how many toothpicks are here," it mutters. "There are three!"
you shout with confidence.

You have defeated the Terrible Trivium. Go up a level. Also back to
the Dungeon or whatever.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# Forms

## Forms

Forms attempt to make it easier for users to submit information to
your website. Instead of manually parsing data that comes in as `POST`
data, Django will parse and validate information for you.

Now you can render forms in a template like this

```djangotemplate
{{ form.as_p }}
```

... instead of like this

```html
<form action="/your-name/" method="post">
  <label for="your_name">Your name: </label>
  <input id="your_name" type="text" name="your_name" value="{{ current_name }}">
  <input type="submit" value="OK">
</form>
```

## Form Class

Forms are implemented as classes. They do a lot of magic to validate
the data that comes back, which means less time writing tedious code.

You can even specify what kind of HTML form field to use and how to
validate the data coming back from the user.

---

This form uses a `<textarea>` instead of a `<input type="text">`.

It also validates the user's submitted form by constraining the number
of characters in the subject to 100 characters and making the `attn`
field optional.

```python
from django import forms

class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    attn = forms.CharField(max_length=100, required=False)
    cc_myself = forms.BooleanField(required=False)
```

## Widgets and Validation

You can also write your own custom HTML widgets and validators.

Maybe you need to make sure that a field is a valid SHA hash. Just
write a function to check its length, and ensure that all the values
are in `[a-f0-9]`.


## Creepy Clipboard

-----

What is this a clipboard? Oh, it has a little survey on it. OUCH! It
bit your mango finger! That’s gonna
bruise. [You are dead.](#you-are-dead)

# Django Apps

## Django Apps

Back in the day, Django was designed to allow developers to write
reusable applications. That way, future developers could re-use
existing code that has already been tested.

Because we all test our code.

Test your code.

## Examples!

*(Read a horn tootin')*

* [Django Competition](https://github.com/michaelwisely/django-competition)
* [Django Greta](https://github.com/michaelwisely/django-greta)
* [Django Allauth](http://www.intenct.nl/projects/django-allauth/)
* [Django Rest Framework](http://www.django-rest-framework.org/)

## Writing a Reusable App

* Read the docs
* Be generic
* Stick to the framework
* Don't get clever

## A Lion

-----

It is preoccupied with a beach ball. You got lucky this time.

![](http://33.media.tumblr.com/28c0eb908d68fd32b76089863933451e/tumblr_n6thuoReMm1re0m3eo1_r2_500.gif)

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# Deploying

## Gettin' Ready

Be sure to turn off all `DEBUG_*` settings.

Use another bit of software to help run your Django app in parallel
and make it more redundant. I am partial to `gunicorn`

## Take Security Precautions

Don't open unnecessary ports on your deployment machine.

Check your configurations.

Be paranoid.

## Use WSGI

That's what they want you to use, so use it.

I like `gunicorn` + `nginx`


## A Generic Enemy

-----

Entering this new part of the dungeon you see a person standing to greet you.

"Hello," you say.

"Oh, hello," they say. "I didn't know anyone else was down here."

The silence becomes awkward. [You are dead.](#you-are-dead)

# Authentication

## Free Batteries

Django comes with a `User` model and a bunch of helper functions and
views to help you get users set up. Django makes it easy to check
whether a user is logged in, get their information, log them in, and
log them out. It's really nice.

You just have to write some custom views for `login` and `logout` to
make those pages look like the rest of your site. Also other minor
setup. Read the docs.


## More Batteries

**Django AllAuth** is a third-party application that makes it easy to
use other services for authentication:

* OAuth 2.0
    * GitHub
    * Google
* Facebook (Might be oauth?)
* OpenID
    * Starting to phase out. Do avoid.


## A Helpful Police Officer

-----

You run into a uniformed police officer.

"What are you doing down here?" you ask. "I could really use help
finding my way around here."

He continues eating his donuts and coffee because he is a stereotype.

You partake in the breakfast foods. Go up a level.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# RESTful APIs

## Use restframework

Django Rest Framework is the best.

Period.

Their code base is beautiful and their documentation is good.

Also, your app will come with a free browser-friendly API explorer, if
you want to use it.

## Demo

Possibly?

## The Unhelpful Parrot

-----

A parrot perched on a... perch... watches as you enter the next
room. Despite a terrible fear of birds, you proceed to ask it for
directions.

"Hello..." you ask timidly.

The parrot squawks back

```json
{
  "code": 401,
  "message": "Requires authentication"
}
```

You don't understand and run away in fear.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# Interactive Frontends

## The Difference

`<rant>`

## The Difference

`</rant>`

## JS Frameworks

You can expect to be able to use most any JavaScript / CSS framework
you'd like with Django.

It speaks HTTP, so just make sure the content of your requests and
responses jive between your frontend and backend.

AngularJS's `$resource`, for example, expects URLs to be a certain
way, and for responses to take a particular form. Either your Django
app will have to adjust to meet Angular's needs, or you'll have to use
`$http` or something in Angular to meet Django's needs.

## Cool things

* AngularJS
* EmberJS
* Dart
* Elm

## The Room of Ever-Changing Dimensions

-----

It seems as though you have been walking through this room
forever. You've been walking in the same direction, but you seem to
make no progress.

You step to the side, and the floor freaks out, dragging you to the
door at the other end.

You look around to see that the room is actually regular size. Despite
your attempts to walk, it was changing around you. Your unexpected
side-step broke its underlying logic.

Parallax scrolling is stupid.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)
[Parallax scrolling isn't stupid](#no)

# Security

## Please, no?

[Here's a link](https://docs.djangoproject.com/en/1.7/topics/security/). My
hands are killing me

## An Unjustifiably Nervous Troll

---

You happen upon an enormous Troll reading the newspaper.

"Did you hear about the government agency stealing all of our data?"
he says unsteadily.

"No," you reply.

"I deleted all my Internet accounts just in case. Ain't nobody
stealing my gooey butter cookie recipe," he booms in an overly loud
and shaky voice.

Stone faced, you back away slowly to return to the dungeon or whatever.

[Back to the Dungeon or Whatever](#the-dungeon-or-whatever)

# Other Batteries

## Free Stuff

* The Admin
* Authentication
* Pagination
* Sending emails
* Feeds (Atom, RSS)

# *Story Slides*

## You are dead

You shouldn'ta done whatever you done did.

Good thing you had a bookmark.

[Turn back to that dungeon slide.](#the-dungeon-or-whatever)

## No

You have to go back to the dungeon or whatever.

[Go back to the dungeon or whatever](#the-dungeon-or-whatever)

## Use The Key

You did it! You found the right door! It was just locked, is all.

You leave the dungeon with more knowledge of web development than when
you entered, though you're still confused as to how you got in the dungeon in the first place.

[Go back to the dungeon to explore again.](#the-dungeon-or-whatever)

[Go Home](#go-home)

## Go Home

Thanks for coming

**Don't forget to register for MegaMinerAI15!**

<!--  Localwords:  Django MegaMinerAI imgur png ACM SIG Neato django
 -->

<!--  LocalWords:  Djragons Frontends APIs nauseam
 -->
