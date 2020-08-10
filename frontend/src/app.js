App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const iotBlockchain = await $.getJSON('iotBlockchain.json')
    App.contracts.iotBlockchain = TruffleContract(iotBlockchain)
    App.contracts.iotBlockchain.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.iotBlockchain = await App.contracts.iotBlockchain.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.iotBlockchain.taskCount()
    const $taskTemplate = $('.taskTemplate')


    /*function gcd (a, b)
  {
     var r;
     while (b>0)
     {
        r=a%b;
        a=b;
        b=r;
     }
     return a;
  }
  
  function rel_prime(phi)
  {
     var rel=5;
     
     while (gcd(phi,rel)!=1)
        rel++;
     return rel;
  }
  
  function power(a, b)
  {
     var temp=1, i;
     for(i=1;i<=b;i++)
        temp*=a;
      return temp;
  }
  
  
  
  function decrypt(c, d, N)
  {
     var r,i=0,prod=1,rem_mod=0;
     while (d>0)
     {
        r=d % 2;
        if (i++==0)
           rem_mod=c % N;
        else{
     a=rem_mod;b=N;
     var temp=1, j;
         forj=1;j<=b;j++)
            temp*=a;
       }
           rem_mod=temp;
        if (r==1)
        {
           prod*=rem_mod;
           prod=prod % N;
        }
        d=parseInt(d/2);
     }
     return prod;
  }*/




    // Render out each task with a new task template
    //for (var i = 1; i <= taskCount; i++) {
    // Fetch the task data from the blockchain
    const task = await App.iotBlockchain.T()
    const taskId = task[0].toNumber()
    // const taskContent = decrypt(task[1],5,35);
    //var pt = Math.pow(task[1],5);
    //pt = pt%35;
    const taskContent = task[1];
    //console.log("new"+taskContent);

    //const taskCompleted = task[2]

    // Create the html for the task
    const $newTaskTemplate = $taskTemplate.clone()
    $newTaskTemplate.find('.content').html(taskContent)
    $newTaskTemplate.find('input')
      .prop('name', taskId)
    //.prop('checked', taskCompleted)
    // .on('click', App.toggleCompleted)

    // Put the task in the correct list
    //    if (taskCompleted) {
    //    $('#completedTaskList').append($newTaskTemplate)
    // } else {
    //  $('#taskList').append($newTaskTemplate)
    //}

    // Show the task
    $newTaskTemplate.show()

  },

  createTask: async (value) => {
    App.setLoading(true)
    const content = value;
    console.log(content);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    await App.iotBlockchain.createTask(content, dateTime)
    window.location.reload()
  },

  createTask2: async () => {
    App.setLoading(true)
    const content = $('#newTask2').val();
    console.log(content);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    await App.iotBlockchain.createTask(content, dateTime)
    window.location.reload()
  },

  createTask3: async () => {
    App.setLoading(true)
    const content = $('#newTask3').val();
    console.log(content);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    await App.iotBlockchain.createTask(content, dateTime)
    window.location.reload()
  },

  createTask4: async () => {
    App.setLoading(true)
    const content = $('#newTask5').val();
    console.log(content);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    await App.iotBlockchain.createTask(content, dateTime)
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
