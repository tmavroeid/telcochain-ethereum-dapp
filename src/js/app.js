App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    requestID: 0,
    quantity: 0,
    name: null,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originRetailerID: "0x0000000000000000000000000000000000000000",
    productID: 0,
    productNotes: null,
    productPrice: 0,
    isAvailable: false,
    originCompanyDepartmentID: "0x0000000000000000000000000000000000000000",
    vendorID: "0x0000000000000000000000000000000000000000",
    distributionCenterID: "0x0000000000000000000000000000000000000000",
    customerID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",


    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.requestID = $("#requestid").val();
        App.quantity = $("#assetQuantity").val();
        App.name = $("#assetName").val();
        App.ownerID = $("#ownerID").val();
        App.originRetailerID = $("#originRetailerID").val();
        App.originRetailerName = $("#originRetailerName").val();
        App.productID = $("#productID").val();
        App.isAvailable = $("#isAvailable").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.originCompanyDepartmentID = $("#originCompanyDepartmentID").val();
        App.vendorID = $("#vendorID").val();
        App.distributionCenterID = $("#distributionCenterID").val();
        App.customerID = $("#customerID").val();
        App.retailerID = $("#retailerID").val();


        console.log(
          App.sku,
          App.upc,
          App.requestID,
          App.quantity,
          App.name,
          App.ownerID,
          App.originRetailerID,
          App.originRetailerName,
          App.productID,
          App.isAvailable,
          App.productNotes,
          App.productPrice,
          App.originCompanyDepartmentID,
          App.vendorID,
          App.distributionCenterID,
          App.customerID,
          App.retailerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
            //App.originCompanyDepartmentID = res[1];
        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchRequest();
            App.fetchAssetBufferOne();
            App.fetchAssetBufferTwo();
            App.fetchEvents();

        });


        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.requestAsset(event);//retailer
                break;
            case 2:
                return await App.receiveAsset(event);//company
                break;
            case 3:
                return await App.planAsset(event);//company
                break;
            case 4:
                return await App.approveAsset(event);//company
                break;
            case 5:
                return await App.processAsset(event);//distribution center
                break;
            case 6:
                return await App.dispatchAsset(event);//vendor
                break;
            case 7:
                return await App.collectAsset(event);//distribution center
                break;
            case 8:
                return await App.packageAsset(event);//distribution center
                break;
            case 9:
                return await App.shipAsset(event);//distribution center
                break;
            case 10:
                return await App.acquireAsset(event);//retailer
                break;
            case 11:
                return await App.sellAsset(event);//retailer
                break;
            case 12:
                return await App.buyAsset(event);//customer
                break;
            case 13:
                return await App.fetchRequest(event);
                break;
            case 14:
                return await App.fetchAssetBufferOne(event);
                break;
            case 15:
                return await App.fetchAssetBufferTwo(event);
                break;
            case 16:
                return await App.addRetailer(event);
                break;
            case 17:
                return await App.renounceRetailer(event);
                break;
            case 18:
                return await App.addCompanyDepartment(event);
                break;
            case 19:
                return await App.renounceCompanyDepartment(event);
                break;
            }
    },

    requestAsset: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
        console.log(App.requestID);
        console.log(App.name);
        console.log(App.quantity);
        console.log(App.metamaskAccountID);
        console.log(App.originRetailerName);
        console.log(App.originCompanyDepartmentID);
            return instance.requestAsset(
                App.requestID,
                App.name,
                App.quantity,
                App.metamaskAccountID,
                App.originRetailerName,
                App.originCompanyDepartmentID
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('requestAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.requestID);
          console.log(App.upc);
          console.log(App.metamaskAccountID);
          console.log(App.originCompanyDepartmentID);
            return instance.receiveAsset(
                App.requestID,
                App.originCompanyDepartmentID,
                App.upc,
                {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    planAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.productPrice);
          console.log(App.productNotes);
          console.log(App.metamaskAccountID);
          console.log(App.originCompanyDepartmentID);
            return instance.planAsset(
                App.upc,
                App.productPrice,
                App.productNotes,
                App.originCompanyDepartmentID,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('planAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    approveAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);
          console.log(App.distributionCenterID);
            return instance.approveAsset(
                App.upc,
                App.distributionCenterID,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('approveAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);
          console.log(App.isAvailable);
          console.log(App.vendorID);
            return instance.processAsset(
                App.upc,
                App.isAvailable,
                App.vendorID,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    dispatchAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);

            return instance.dispatchAsset(
                App.upc,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('dispatchAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    collectAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);
            return instance.collectAsset(
                App.upc,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('collectAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    packageAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packageAsset(
                App.upc,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packageAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);
            return instance.shipAsset(
                App.upc,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    acquireAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          console.log(App.upc);
          console.log(App.metamaskAccountID);
            return instance.acquireAsset(
                App.upc,
               {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('acquireAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            //const productPrice = web3.toWei(1, "ether");
            //console.log('productPrice',productPrice);
            console.log(App.upc);
            console.log(App.metamaskAccountID);
            return instance.sellAsset(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyAsset: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            console.log(App.upc);
            console.log(App.metamaskAccountID);
            return instance.buyAsset(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyAsset',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addRetailer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            console.log("skatoules1")
            console.log(App.retailerID);
            console.log("skatoules2")

            console.log(App.metamaskAccountID);
            return instance.addretailer(App.retailerID, {from: App.metamaskAccountID});
            console.log("skatoules3")

        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addRetailer',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addCompanyDepartment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            console.log(App.originCompanyDepartmentID);
            console.log("skatoules4")
            console.log(App.metamaskAccountID);
            return instance.addcompanydepartment(App.originCompanyDepartmentID, {from: App.metamaskAccountID});
            console.log("skatoules5")

        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addcompanydepartment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchRequest: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.requestID = $('#requestid').val();
        console.log('requestid',App.requestID);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchRequest(App.requestID);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchRequest', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchRequestByRetailer: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.retailerID = $('#requestid').val();
        console.log('requestid',App.retailerID);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchRequestByRetailer(App.retailerID);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchRequestByRetailer', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchAssetBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchAssetBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchAssetBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchAssetBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchAssetBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchAssetBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
