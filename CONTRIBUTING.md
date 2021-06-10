## Contributing code back to **wp-react-lib**

There are several ways in which this can be achieved:

### Forking **wp-react-lib** for a feature/fix development

The best and easiest is to fork **wp-react-lib** for the sole purpose of developing a new module/feature/fix. You can very well use your own private github user space to do this and thus you can use the FORK button on the Ghihub page. After the fork you can commit all your new stuff to your copy of wp-react-lib then ask for a Pull Request of your code back into wp-react-lib project. 

### Develop the contributions in an already forked project

Yes, it would be cool if we could develop the new contribution as part of your current project, which was forked some time ago from **wp-react-lib**. It is possible but it is a bit trickier. You will not be able to merge your project back to **wp-react-lib**, because this will bring all your project's custom code into this project, so basically the customized implementation the client has asked for, like custom React components that it asked. That is undesirable.

One simple solution to this is to commit the changes you are willing to merge back to **wp-react-lib** as atomic changes. That means that when you commit your files, you commit only those files that are related to that new feature and nothing else. For example let's suppose you want to develop a new chart component using Nivo library and then you will like to merge this new module to **wp-react-lib**. You should commit all the code that has to do with the search module in separate commits that do not contain other code, for example if the chart component has some specific part that is tied to the client implementation, you will commit that linking in a separate commit, so keep the commits that target the module functionality separate. 

Then, you can cherry-pick your project's branch over the **wp-react-lib** remote branch. By doing so, you can pick what commits to apply and what to leave out and you will choose only the commits that implement the generic new module functionality and you will leave out the client-specific customizations that are not meant to be posted to **wp-react-lib**.

And thanks for contributing to this project!
