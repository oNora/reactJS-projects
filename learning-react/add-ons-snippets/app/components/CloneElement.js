var React = require('react');
var Clone = require('react-clone').default

var Child = React.createClass({
  render: function() {
      console.log('this.props doSomething: ', this.props.doSomething);
        return (<div onClick={ () => this.props.doSomething(this.props.value) }>Click Me and look at the console in browser.</div>);
  }
});

var Parent = React.createClass({
    doSomething: function(value) {
        console.log('doSomething called by child with value:', value);
    },
    render: function() {
            var childrenWithProps = React.Children.map(this.props.children, (child, index) => {return <Clone element={child} index={index}>{childrenWithProps}</Clone> });
            return(
                <div>
                    <Child value="1" doSomething={this.doSomething}/>
                    <Child value="2" doSomething={this.doSomething}/>
                    <Child value="supa dupa" doSomething={this.doSomething}/>
                </div>
            )
    }
});


module.exports = Parent;