import axios from "axios";

const APIKey = "6a7be2f08d9149deac4d5aa878bd41ec"

export default {
  runQuery: function(term, start, end) {

		term = term.trim();
		start = start.trim() + "0101";
		end = end.trim() + "1231";

		return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
			params: {
				"api-key": APIKey,
				"q": term,
				"begin_date": start,
				"end_date": end
			}
		})

		.then(function(results){

			return results.data.response;

		});
	},

	getSaved: function(){

		return axios.get("/api/saved")
			.then(function(results){

				return results;
			})
	},

	postSaved: function(_id, title, date, url) {

		var newArticle = {_id: _id, title: title, date: date, url: url};
		return axios.post("/api/saved", newArticle)
			.then(function(results){
				console.log("yay")
				return results._id;

			})
	},

	deletedSaved: function(_id, title, date, url){
		console.log("deleted")
		return axios.delete("/api/saved", {
			params: {
				"_id": _id,
				"title": title,
				"date": date,
				"url": url
			}

		})

		.then(function(results){
			return results;
		})

	}
};


