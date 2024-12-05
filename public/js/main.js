document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const campaignList = document.getElementById('campaignList');

    // Fetch and display campaigns
    function fetchCampaigns() {
        fetch('/api/campaigns')
            .then(response => response.json())
            .then(data => {
                campaignList.innerHTML = '';
                data.data.forEach(campaign => {
                    const campaignElement = document.createElement('div');
                    campaignElement.className = 'bg-gray-50 p-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-md';
                    campaignElement.innerHTML = `
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-indigo-700">${campaign.campaign_name}</h3>
                            <span class="text-sm font-medium text-gray-500">ID: ${campaign.id}</span>
                        </div>
                        <p class="text-gray-600 mt-2"><span class="font-medium">Client:</span> ${campaign.client}</p>
                        <p class="text-gray-600"><span class="font-medium">Budget:</span> $${campaign.budget.toLocaleString()}</p>
                    `;
                    campaignList.appendChild(campaignElement);
                });
            })
            .catch(error => console.error('Error fetching campaigns:', error));
    }

    // Add new campaign
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addForm);
        const campaignData = Object.fromEntries(formData);

        fetch('/api/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            addForm.reset();
            fetchCampaigns();
            showNotification('Campaign added successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('Error adding campaign', 'error');
        });
    });

    // Update campaign
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(updateForm);
        const campaignData = Object.fromEntries(formData);
        const id = campaignData.update_id;
        delete campaignData.update_id;

        fetch(`/api/campaigns/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaign_name: campaignData.update_campaign_name,
                budget: campaignData.update_budget,
                client: campaignData.update_client
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            updateForm.reset();
            fetchCampaigns();
            showNotification('Campaign updated successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('Error updating campaign', 'error');
        });
    });

    // Delete campaign
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(deleteForm);
        const id = formData.get('delete_id');

        fetch(`/api/campaigns/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            deleteForm.reset();
            fetchCampaigns();
            showNotification('Campaign deleted successfully!', 'success');
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('Error deleting campaign', 'error');
        });
    });

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-lg transition-opacity duration-500`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Initial fetch of campaigns
    fetchCampaigns();
});

