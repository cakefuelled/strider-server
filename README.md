# Strider API

The strider API is powered by [Dropwizard](http://dropwizard.io). We decided to go with this because of the simplicity and amount of features offered.

Running the server requires postgresql, then you can do (in the root dir)

```
$ mvn package
$ strider-service/target/strider-service-0.1.jar server strider-local.yml
```

##Contributing
Pull Requests are always welcome, take a look at the existing code to become familiar with our style guide.

##License
Strider is released under the GNU Aferro GPL v3.0 License

If you want to use it for commercial purposes get in touch with us.
