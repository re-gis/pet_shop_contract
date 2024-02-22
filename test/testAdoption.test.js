const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe("Adopting a pet and retrieving the account address!", async () => {
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });

    it("can fetch address of the owner by pet id", async () => {
      const adopter = await adoption.adopters(8);
      assert.equal(
        adopter,
        expectedAdopter,
        "This is the owner of the adopted pet"
      );
    });

    it("can fetch the collection of all adopters address", async () => {
      const adopters = await adoption.getAdopters();
      assert.equal(
        adopters[8],
        expectedAdopter,
        "The pet adopter has already been added to the collection"
      );
    });
  });
});
